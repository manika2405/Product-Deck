# Product Deck – DevOps CI/CD Pipeline

This project showcases a full DevOps pipeline for a full-stack web application consisting of:

- **Frontend:** Vite + React (port 5173)
- **Backend:** Node.js + Express (port 8000)

The pipeline automates **build → analysis → testing → containerization → deployment**.

---

## 🚀 Tools Used & Why

| Tool | Purpose |
|------|---------|
| **GitHub** | Source code versioning |
| **Jenkins** | CI/CD automation pipeline |
| **Node.js + Vite** | Builds frontend & backend |
| **SonarQube** | Static code analysis (bugs, vulnerabilities, smells) |
| **Docker** | Creates containers for backend & frontend |
| **WSL2 (Ubuntu)** | Linux environment needed for Ansible & Docker |
| **Ansible** | Automates deployment steps |
| **Selenium (Optional)** | UI test to verify homepage loads |

---

## 🔄 Pipeline Stages (Summary)

1. **Checkout Code** from GitHub  
2. **Install Dependencies** (backend + frontend)  
3. **Vite Build** → Produces production `dist/` directory  
4. **SonarQube Code Analysis**  
5. **Build Docker Images**  
6. **Deploy via Ansible (runs on WSL)**  
   - Stops old containers  
   - Removes them  
   - Starts new frontend & backend containers  
7. **(Optional) Selenium Tests**  

---

## 🐳 Run Containers Manually

```bash
docker build -t product-deck-backend ./backend
docker build -t product-deck-frontend ./frontend

docker run -d -p 8000:8000 --name backend product-deck-backend
docker run -d -p 5173:5173 --name frontend product-deck-frontend
