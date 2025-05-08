# Use a single stage based on a Debian variant that supports apt-get
FROM node:18-bookworm-slim

# Set environment variables
ENV NODE_ENV=production
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV TINI_VERSION v0.19.0
ENV XDG_CONFIG_HOME=/tmp/.chromium_config \
    XDG_CACHE_HOME=/tmp/.chromium_cache

RUN groupadd -r appgroup && adduser --system --ingroup appgroup appuser

RUN mkdir -p /tmp/.chromium_config /tmp/.chromium_cache && \
    chown -R appuser:appgroup /tmp/.chromium_config /tmp/.chromium_cache 
# Install dependencies as root
USER root

ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini.asc /tini.asc
RUN chmod +x /tini

RUN apt-get update && apt-get install -yq --no-install-recommends \
    # --- Chromium Browser ---
    chromium \
    # --- Dependencies for Chromium ---
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libexpat1 \
    libgbm1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    xdg-utils \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Verify Chromium installation (still useful)
RUN echo "Verifying Chromium installation..." && \
    ls -l /usr/bin/chromium && \
    which chromium && \
    chromium --version || echo "Chromium verification failed!"

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node.js dependencies (as root, easier for global cache etc.)
RUN npm ci --only=production # or --omit=dev

# Copy the rest of your application code
# IMPORTANT: Make sure you have a good .dockerignore file!
COPY . .

# Change ownership of the app directory to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

ENTRYPOINT ["/tini", "--"]

# Define the command to run your worker
# Ensure this path is correct relative to /app
CMD ["node", "jobs/worker.js"]