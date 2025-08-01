
// DOCS: https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets
// AUTH: https://developer.twitter.com/en/docs/authentication/oauth-2-0/bearer-tokens
// LIBRARIES: None, just `fetch`

const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

interface Tweet {
    id: string;
    text: string;
    imageUrl: string;
}

// Function to get user ID from username
async function getUserIdByUsername(username: string): Promise<string> {
    const url = `https://api.twitter.com/2/users/by/username/${username}`;
    const headers = {
        'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
    };

    const response = await fetch(url, { headers });
    if (!response.ok) {
        throw new Error(`Failed to fetch user ID: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.errors) {
        throw new Error(`Error from Twitter API: ${data.errors[0].detail}`);
    }

    return data.data.id;
}


export async function getLatestTweetsWithImages(username: string): Promise<Tweet[]> {
    if (!TWITTER_BEARER_TOKEN) {
        console.error("Twitter Bearer Token not found.");
        return [];
    }

    try {
        const userId = await getUserIdByUsername(username);
        const url = `https://api.twitter.com/2/users/${userId}/tweets?expansions=attachments.media_keys&media.fields=url,type&tweet.fields=text&max_results=20`;
        const headers = {
            'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
        };

        const response = await fetch(url, { cache: 'no-store' }); // Use no-store for fresh data
        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Failed to fetch tweets: ${response.statusText}`, errorBody);
            return [];
        }

        const data = await response.json();

        if (!data.data) {
             console.log("No tweets found for this user.");
            return [];
        }

        const mediaMap = new Map(data.includes?.media?.map((m: any) => [m.media_key, m.url]) || []);

        const tweetsWithImages = data.data
            .map((tweet: any) => {
                const mediaKeys = tweet.attachments?.media_keys || [];
                const firstImageKey = mediaKeys.find((key: string) => mediaMap.has(key));

                if (firstImageKey) {
                    return {
                        id: tweet.id,
                        text: tweet.text,
                        imageUrl: mediaMap.get(firstImageKey),
                    };
                }
                return null;
            })
            .filter((t: any): t is Tweet => t !== null);

        return tweetsWithImages;

    } catch (error) {
        console.error("Error fetching tweets:", error);
        return [];
    }
}
