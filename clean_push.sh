#!/bin/bash

# -------------------------------
# 1️⃣ Configura limites para push grande
git config http.postBuffer 524288000
git config http.maxRequestBuffer 100M
git config http.lowSpeedLimit 0
git config http.lowSpeedTime 999999
git config core.compression 0

# -------------------------------
# 2️⃣ Remove arquivos pesados e secretos locais
rm -rf node_modules/.cache
rm -rf .next/cache
rm -rf out/cache
find . -type f -name "*service-account*.json" -delete
find . -type f -name "*.env" -delete
find . -type f -name "*.key" -delete
find . -type f -name "*.pem" -delete
find . -type f -name "*.zip" -delete

# -------------------------------
# 3️⃣ Limpa histórico de commits com arquivos sensíveis
git filter-branch --force --index-filter \
"git rm --cached --ignore-unmatch *service-account*.json *.env *.key *.pem *.zip" \
--prune-empty --tag-name-filter cat -- --all

# -------------------------------
# 4️⃣ Limpa refs antigas e recompacta
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# -------------------------------
# 5️⃣ Cria .gitignore completo
cat <<EOF > .gitignore
# Node / Next.js
node_modules/
.next/
dist/
out/
build/
coverage/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.env
.env.local
.env.production
.env.development
.env.test
*.local
*.log
*.pid
*.seed
*.pid.lock

# Firebase
firebase-debug.log
.firebase/
firestore-debug.log
functions/lib/
functions/node_modules/
functions/.env
serviceAccountKey.json
service-account*.json

# Mac / Sistema
.DS_Store
Thumbs.db

# IDEs
.vscode/
.idea/
*.swp

# Arquivos pesados
*.zip
*.tar
*.gz
*.7z
*.mp4
*.mov
*.psd
*.ai
*.bak
EOF

# -------------------------------
# 6️⃣ Reconfigura remoto e branch
git remote remove origin 2>/dev/null
git remote add origin https://github.com/studiofirebase/studiofirebase.git
git branch -M main

# -------------------------------
# 7️⃣ Commit final
git add .
git commit -m "🔥 Limpeza total + push seguro + .gitignore atualizado"

# -------------------------------
# 8️⃣ Força o push
git push origin main --force

echo "✅ Push completo e seguro concluído!"
