# Careerone Portfolio Management

This is an additional feature for the Careerone Platform (https://careerone.gov.lk/), Sri Lanka's national career guidance platform. The feature enables registered students to manage their personal portfolios directly within the platform.

## Features

- **Profile Management**: Edit and manage personal information including contact details, profile photo, and career summary
- **Education & Training**: Record academic qualifications, certifications, and completed courses
- **Experience & Skills**: Document work experience, technical skills, and language proficiency
- **CV Generator**: Generate and download customized CVs based on the entered information

## Technology Stack

- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Webpack for bundling
- jsPDF and html2canvas for PDF generation

## Getting Started

### Prerequisites

- Node.js 16+ and npm installed

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd careerone-portfolio
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```
   The application will open in your default browser at http://localhost:3000.

### Building for Production

To create a production build:
```
npm run build
```

The built files will be in the `dist` folder.

## Integration with Careerone Platform

This portfolio feature is designed to be integrated into the existing Careerone Platform. The integration process will involve:

1. Adding the portfolio section to the student dashboard
2. Connecting the portfolio to the existing user authentication system
3. Linking course completion data from the platform to the portfolio
4. Enabling admin access to student CVs with permission

## Project Structure

```
careerone-portfolio/
├── src/                    # Source files
│   ├── components/         # React components
│   │   ├── common/         # Shared components like Header and Footer
│   │   ├── profile/        # Profile-related components
│   │   ├── education/      # Education and certification components
│   │   ├── experience/     # Experience and skills components
│   │   └── cvgenerator/    # CV generation components
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── styles/             # CSS styles
│   ├── utils/              # Utility functions
│   ├── assets/             # Static assets
│   ├── App.tsx             # Main app component
│   └── index.tsx           # Entry point
├── public/                 # Public assets
├── dist/                   # Production build (generated)
├── webpack.config.js       # Webpack configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Future Enhancements

- Multi-language support for Sinhala and Tamil
- AI integration for improving CV content
- Integration with job matching features
- Analytics for tracking CV performance

## License

This project is proprietary and owned by Careerone.

## Contact

For any queries regarding this feature, please contact the Careerone development team.
