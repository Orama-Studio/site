FROM node:20-alpine AS base

# Install Hugo extended edition
ARG HUGO_VERSION=0.145.0
ARG DART_SASS_VERSION=1.98.0
RUN apk add --no-cache wget git libc6-compat \
    && wget -O hugo.tar.gz "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-arm64.tar.gz" \
    && tar -xzf hugo.tar.gz -C /usr/local/bin/ hugo \
    && rm hugo.tar.gz \
    && wget -O dart-sass.tar.gz "https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-linux-arm64-musl.tar.gz" \
    && tar -xzf dart-sass.tar.gz \
    && cp -r dart-sass/* /usr/local/bin/ \
    && rm -rf dart-sass dart-sass.tar.gz

WORKDIR /src

# Install node dependencies first (for caching)
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the site
COPY . .

EXPOSE 1313

CMD ["hugo", "server", "--bind", "0.0.0.0", "--baseURL", "http://localhost:1313", "--appendPort=false", "--disableFastRender"]
