# 🧠 Git Cheat Sheet

## 🔧 1. Setup & Configuration

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

## 📥 2. Clone a Repository

```bash
git clone https://github.com/user/repo.git
```

---

## 📌 3. Check Status

```bash
git status
```

---

## ➕ 4. Add Changes

```bash
git add filename           # Add specific file
git add .                  # Add all changes
```

---

## 📦 5. Commit Changes

```bash
git commit -m "Your message here"
```

---

## 📤 6. Push Changes

```bash
git push origin branch-name
```

> Default branch is usually `main` or `master`.

---

## 🔄 7. Pull Latest Changes

```bash
git pull origin branch-name
```

---

## 🌿 8. Branch Management

```bash
git checkout branch-name             # Switch to branch
git checkout -b new-branch-name     # Create & switch
git branch                          # List local branches
git branch -r                       # List remote branches
```

---

## 🕓 9. View Commit History

```bash
git log
```

---

## 📥 10. Stash Changes (Temporary Save)

```bash
git stash       # Save current work
git stash pop   # Reapply last stash
```

---

## ❌ 11. Discard Changes

```bash
git checkout -- filename     # Discard file changes
git reset --hard             # Discard all uncommitted changes
```

---

# 🚀 Creating a New Repository (Full Flow)

## ✅ Step 1: Create Repo on GitHub

- Go to [https://github.com](https://github.com)
- Click **New repository**
- Set repo name, visibility, **don’t initialize with README**
- Click **Create repository**

---

## 🖥️ Step 2: Create Local Project & Initialize Git

```bash
mkdir my-project
cd my-project
git init
```

---

## 📝 Step 3: Add Files & Make First Commit

```bash
touch README.md         # or manually add files
git add .
git commit -m "Initial commit"
```

---

## 🔗 Step 4: Link to GitHub

```bash
git remote add origin https://github.com/your-username/your-repo.git
```

---

## 📤 Step 5: Push to GitHub

```bash
git branch -M main         # Rename branch to main
git push -u origin main    # Push with upstream
```

---

## 🔁 Step 6: Routine Workflow

```bash
git pull                  # Pull latest changes
git add .                 # Stage all changes
git commit -m "Message"   # Commit
git push                  # Push to GitHub
```
