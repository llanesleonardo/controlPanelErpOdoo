# Security Patterns — Three Examples Each

> Concrete examples for every pattern in [Security Patterns INDEX](../Security_patterns/INDEX.md). Learning doc — not official vendor architecture.

## How to read this table

Start with **risk** — what breaks if you ignore it — then match the **pattern** and read three examples to recognize it in real systems. Same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Risk | Pattern | Examples (short) |
| ---- | ------- | ------------------ |
| Perimeter trust lets lateral movement after one breach | **Zero Trust** | **1.** Every API call verified regardless of internal network. **2.** mTLS between all microservices in mesh. **3.** No VPN trust; identity-based access only. |
| Ad hoc permissions cannot scale or audit consistently | **RBAC** | **1.** `admin` vs `editor` vs `viewer` WordPress roles. **2.** Kubernetes RBAC for who can delete pods. **3.** Shopify staff permissions per store role. |
| Coarse roles grant too much or too little access | **ABAC** | **1.** Access if `department=finance` AND `region=US`. **2.** Doctor sees patients only in assigned hospital attribute. **3.** Franchisee manager sees only their `locationIds`. |
| Apps store user passwords or build unsafe custom auth | **OAuth2** | **1.** “Login with Google” on SaaS app. **2.** Shopify app installs via OAuth to get shop token. **3.** Mobile app authorization code flow with PKCE. |
| OAuth alone lacks standard identity claims for SSO | **OpenID Connect** | **1.** OIDC on top of OAuth returns `id_token` with user claims. **2.** Enterprise SSO to internal tools via Okta OIDC. **3.** AWS Cognito user pool OIDC for SPA login. |
| Duplicate accounts per app; password sprawl | **Federated Identity** | **1.** Employees use corporate IdP to access vendor SaaS. **2.** SAML federation between university and research portal. **3.** Cross-cloud identity with Azure AD B2B guests. |
| Backend services exposed without centralized auth | **API Token Gateway** | **1.** Kong validates API keys before routing to backends. **2.** Cloudflare API shield checks tokens at edge. **3.** Internal gateway validates service JWTs. |
| Stateful sessions do not scale or work across services | **JWT** | **1.** Stateless session: `Authorization: Bearer` JWT with `sub`, `exp`. **2.** Short-lived access JWT + refresh token pattern. **3.** Signed shop context in Shopify app session JWT. |
| Single control failure exposes entire system | **Defense in Depth** | **1.** WAF + auth + RBAC + encryption + audit logs layered. **2.** PCI: network segment + tokenization + monitoring. **3.** Admin panel behind VPN, MFA, and IP allowlist. |
| Direct SSH to private instances from internet | **Bastion Host** | **1.** SSH only through bastion to private DB subnet. **2.** Jump box for ops access to production VPC. **3.** Hardened admin entry point with session logging. |
| Internal services directly exposed to public network | **DMZ** | **1.** Public web servers in DMZ; app servers private subnet. **2.** Payment capture in PCI DMZ segment. **3.** Reverse proxy in DMZ terminates TLS. |
| Secrets in code or config leak via repos and logs | **Secrets Vault** | **1.** HashiCorp Vault stores DB passwords rotated weekly. **2.** AWS Secrets Manager for API keys. **3.** K8s external secrets sync to pods at runtime. |
| One master key compromise exposes all data | **Envelope Encryption** | **1.** S3 SSE-KMS with per-object data keys. **2.** Database column encrypted with DEK wrapped by KEK. **3.** TLS session keys derived from master secret. |
| TLS and policy enforcement inconsistent per service | **Secure Gateway** | **1.** API gateway terminates TLS and inspects payloads. **2.** Egress proxy filters outbound calls from data center. **3.** Zero-trust access proxy (BeyondCorp style). |
| Services trust network location instead of peer identity | **Mutual TLS** | **1.** Service mesh mTLS between every pod pair. **2.** Bank-to-bank API client and server certs. **3.** IoT device cert authenticates to MQTT broker. |
| Authorization logic duplicated and drifts per service | **Policy Enforcement Point** | **1.** OPA sidecar denies request failing policy.rego. **2.** API gateway PEP checks scopes before upstream. **3.** Service mesh authorization policy on route. |

## Related

- [Risk-driven pattern selection](../risk-driven-patterns.md) — pick patterns by *risk*, not hype
- [Problem solving using SEP](../Problem_solving_using_SEP/INDEX.md) — full system compositions
- [Cross-cutting concerns](../Problem_solving_using_SEP/concerns/INDEX.md) — reads, writes, contention lenses

## How to use

1. Name the **risk** first (what breaks if you get it wrong).
2. Find the **pattern** that addresses that risk.
3. Read all three examples — notice *where* the pattern shows up (API, data, ops).
4. Open the pattern doc in this category for mechanics and TypeScript sketch.
5. Map one example to a [problem file](../Problem_solving_using_SEP/INDEX.md) if you see a match.
