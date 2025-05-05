const customJestConfig = {
    
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Agrega esta línea
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'ts-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!lucide-react).+\\.js$',
    ],
  };
  