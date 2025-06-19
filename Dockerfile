# Use official Playwright image with browsers and dependencies
FROM mcr.microsoft.com/playwright:focal

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all test code
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Run tests by default
CMD ["npx", "playwright", "test", "--project=chromium"]
