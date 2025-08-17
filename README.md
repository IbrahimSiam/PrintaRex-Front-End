# PrintaRex Front-End

A modern, responsive e-commerce platform for custom print-on-demand products, built with React, TypeScript, and Material-UI.

## 🚀 **Quick Start**

### **Local Development**
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

**Always use**: `http://localhost:5173/` for local development

## 🌐 **Access Points**

- **Homepage**: `http://localhost:5173/`
- **Designer**: `http://localhost:5173/app/designer`
- **Catalog**: `http://localhost:5173/app/catalog`
- **Templates**: `http://localhost:5173/templates`

## 🏗️ **Project Structure**

```
src/
├── app/                 # Main app configuration
├── components/          # Reusable UI components
│   └── designer/       # Designer-specific components
│       ├── views/      # Step-based design views
│       ├── EnhancedDesignerSidebar.tsx
│       ├── EnhancedToolPanel.tsx
│       └── FloatingMiniToolbar.tsx
├── pages/              # Page components
├── stores/             # State management (Zustand)
├── styles/             # Global styles
└── utils/              # Utility functions
```

## 🎨 **Enhanced Designer Features**

### **Sidebar Modes**
- **Expanded**: Full sidebar with labels and descriptions
- **Collapsed**: Compact rail with icons only
- **Hidden**: Completely hidden with floating button

### **Keyboard Shortcuts**
- **T** → Text Tool
- **G** → Graphics Library
- **S** → Shapes
- **L** → Layers
- **Escape** → Hide sidebar

### **Responsive Design**
- **Desktop (≥1200px)**: Expanded by default
- **Tablet (≥768px)**: Collapsed by default
- **Mobile (<768px)**: Hidden with floating button

## 🔄 **Development Workflow**

### **Branch Strategy**
```
main (production)
├── development (staging)
└── feature/* (new features)
```

### **Local Development**
1. **Always use**: `http://localhost:5173/`
2. **No port conflicts**: Single development server
3. **Hot reload**: Automatic updates on file changes

### **GitHub Workflow**
- **Push to `development`**: Triggers development deployment
- **Push to `main`**: Triggers production deployment
- **Pull Requests**: Run quality checks and tests

## 📦 **Available Scripts**

```bash
# Development
npm run dev          # Start development server (localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build

# Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
npm run test         # Run tests

# Utilities
npm run clean        # Clean build artifacts
npm run format       # Format code with Prettier
```

## 🚀 **Deployment**

### **Development Environment**
- **Trigger**: Push to `development` branch
- **Automated**: GitHub Actions workflow
- **Tests**: Linting, type checking, unit tests
- **Build**: Production-ready build

### **Production Environment**
- **Trigger**: Push to `main` branch
- **Requirements**: All tests must pass
- **Security**: Security audit included
- **Deployment**: Automated production deployment

## 🛠️ **Tech Stack**

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Material-UI v5
- **State Management**: Zustand
- **Build Tool**: Vite
- **Styling**: CSS Modules + Material-UI
- **Routing**: React Router v6
- **Testing**: Vitest + Testing Library

## 🔧 **Configuration**

### **Environment Variables**
```bash
# Development
VITE_API_URL=http://localhost:3000
VITE_ENV=development

# Production
VITE_API_URL=https://api.printarex.com
VITE_ENV=production
```

### **Vite Configuration**
- **Port**: 5173 (fixed)
- **Host**: 0.0.0.0 (network accessible)
- **HTTPS**: Disabled for local development
- **HMR**: Hot Module Replacement enabled

## 📱 **Browser Support**

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🤝 **Contributing**

1. **Create feature branch**: `git checkout -b feature/amazing-feature`
2. **Make changes**: Develop and test locally
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Create PR**: Merge to `development` branch

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

- **Documentation**: Check this README first
- **Issues**: Create GitHub issue with detailed description
- **Development**: Use `http://localhost:5173/` for local testing
- **Deployment**: Check GitHub Actions for deployment status

---

**Remember**: Always use `http://localhost:5173/` for local development! 🎯

