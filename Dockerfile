FROM node:20-alpine AS base

# Pinned toolchain. Bump and rebuild (`docker compose build --no-cache`) when changing.
ARG HUGO_VERSION=0.161.1
ARG DART_SASS_VERSION=1.99.0

# TARGETARCH is set automatically by buildx / Docker. On Mac arm64 it's "arm64";
# on x86 hosts it's "amd64". We map it to the names Hugo and Dart Sass use in
# their release artifacts.
ARG TARGETARCH
RUN case "${TARGETARCH}" in \
        amd64) HUGO_ARCH=amd64; SASS_ARCH=x64 ;; \
        arm64) HUGO_ARCH=arm64; SASS_ARCH=arm64 ;; \
        *)     echo "Unsupported TARGETARCH: ${TARGETARCH}" >&2; exit 1 ;; \
    esac \
    && apk add --no-cache wget git libc6-compat \
    && wget -O hugo.tar.gz "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_withdeploy_${HUGO_VERSION}_linux-${HUGO_ARCH}.tar.gz" \
    && tar -xzf hugo.tar.gz -C /usr/local/bin/ hugo \
    && rm hugo.tar.gz \
    && wget -O dart-sass.tar.gz "https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-linux-${SASS_ARCH}-musl.tar.gz" \
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
