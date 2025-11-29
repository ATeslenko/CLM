# CLM Visiontype - Document Operations Prototype

A pixel-perfect React implementation of the Figma design for a document management interface.

## 🎨 Design Features

This prototype replicates the following components from the Figma design:

- **Navigation Sidebar**: Workspace selector, main navigation with active states, bottom utility navigation
- **Top Header**: Search functionality, notification badge, user profile controls
- **Document Interface**: Tab navigation, filtering system, status labels, document table
- **Status System**: Draft, Sent, Completed, Awaiting Approval, Rejected status labels
- **Responsive Layout**: Fixed sidebar and header with scrollable main content

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000` to see the prototype

### Build for Production

```bash
npm run build
```

## 🛠 Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Custom Components** - Modular design system

## 📁 Project Structure

```
src/
├── components/
│   ├── Icons.jsx          # SVG icon components
│   ├── Sidebar.jsx        # Left navigation panel
│   ├── Header.jsx         # Top header with search
│   ├── MainContent.jsx    # Main document area
│   ├── DocumentsTable.jsx # Data table component
│   ├── StatusLabel.jsx    # Status badge component
│   └── Avatar.jsx         # User avatar component
├── App.jsx               # Main app layout
├── main.jsx             # React entry point
└── index.css           # Global styles and utilities
```

## 🎨 Design System

### Colors
- **Brand Primary**: `#248567` (Green)
- **Brand Secondary**: `#6453CF` (Purple) 
- **Surface Primary**: `#f7f4f2` (Background)
- **Catchy Fire**: `#FDDCBD` (Accent)
- **Secondary Light**: `#767676` (Text secondary)
- **Secondary Dark**: `#181818` (Text primary)

### Typography
- **Font Family**: Inter (fallback for Graphik LC Web)
- **Weights**: Regular (400), Semibold (600), Bold (700)
- **Sizes**: 9px, 13px, 14px, 24px with matching line heights

### Status Labels
- **Draft**: Gray theme
- **Sent**: Blue theme  
- **Completed**: Green theme
- **Awaiting Approval**: Orange theme
- **Rejected**: Red theme

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Customization

The design system is built with Tailwind CSS custom utilities. You can modify:

- **Colors**: Update `tailwind.config.js`
- **Typography**: Modify font classes in `src/index.css`
- **Components**: Edit individual component files
- **Layout**: Adjust spacing and sizing in components

## 📋 Features Implemented

- ✅ Pixel-perfect sidebar navigation
- ✅ Workspace selector with dropdown indicator
- ✅ Active navigation state styling  
- ✅ Top header with search and user controls
- ✅ Notification badge (red dot with count)
- ✅ Tab navigation with active states
- ✅ Document filtering controls
- ✅ Status label system
- ✅ Data table with proper spacing
- ✅ Avatar components
- ✅ Responsive layout structure

## 🎯 Next Steps for Vibe Coding

This prototype serves as a pixel-perfect foundation. For vibe coding enhancements, consider:

1. **Interactive Elements**: Add hover effects, click animations
2. **Data Integration**: Connect to real API endpoints
3. **State Management**: Add context or Redux for data flow
4. **Advanced Filtering**: Implement working filter logic
5. **Search Functionality**: Add real search capabilities
6. **Responsive Design**: Optimize for mobile and tablet
7. **Accessibility**: Add ARIA labels and keyboard navigation
8. **Micro-interactions**: Smooth transitions and loading states

## 📸 Preview

The prototype matches the original Figma design with:
- Exact color palette and typography
- Precise spacing and component sizing
- Accurate status label styling
- Proper table layout and alignment
- Authentic icon and button styles
