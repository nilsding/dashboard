# Copyright 2023 The Kubermatic Kubernetes Platform contributors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM docker.io/alpine:3.17
LABEL maintainer="support@kubermatic.com"

# Source: https://dl.k8s.io/release/stable-1.26.txt
ENV KUBECTL_VERSION=v1.26.5

# Source: https://github.com/helm/helm/releases
ENV HELM_VERSION=v3.11.3

ARG ARCH=amd64

RUN apk add --no-cache -U \
  bash \
  ca-certificates \
  curl \
  git \
  jq \
  make \
  openssh-client \
  unzip \
  tar

RUN curl -Lo /usr/bin/kubectl https://storage.googleapis.com/kubernetes-release/release/${KUBECTL_VERSION}/bin/linux/${ARCH}/kubectl && \
  chmod +x /usr/bin/kubectl && \
  kubectl version --short --client

RUN curl --fail -L https://get.helm.sh/helm-${HELM_VERSION}-linux-${ARCH}.tar.gz | tar -xzO linux-${ARCH}/helm > /usr/local/bin/helm && \
  chmod +x /usr/local/bin/helm && \
  helm version --short
