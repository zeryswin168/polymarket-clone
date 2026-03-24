# 🔮 Polymarket Clone — Open Source Prediction Market Platform (Polygon + Vue 3 + Solidity)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![Polygon](https://img.shields.io/badge/Chain-Polygon-7B3FE4.svg)](https://polygon.technology/)

A fully functional **prediction market platform** inspired by [Polymarket](https://polymarket.com), built with Vue 3 and designed for deployment on Polygon with on-chain USDT escrow and automated settlement.

![Preview](https://img.shields.io/badge/Status-Live_Demo-green)

---

## ✨ Features

### This Open Source Demo
- 🎨 **Beautiful Mobile UI** — Polymarket-style interface with Vant UI components
- 📱 **Responsive Design** — Mobile-first, works on all screen sizes
- 🎯 **Market Browsing** — Event listing, filtering by category, search
- 📊 **Event Detail** — Outcome probabilities, order panel, positions view
- 👤 **Portfolio Page** — Asset overview, wallet display, trade history
- ⚡ **Fast Build** — Vue 3 + Vite, builds in seconds

### Full Version (Contact Us)
- ✅ **On-chain USDT Escrow** — Funds held in smart contract on Polygon, not by platform
- ✅ **Smart Contract Settlement** — Automated payout to winners via BetMarket contract
- ✅ **UUPS Upgradeable Contract** — Upgrade logic without changing address or state
- ✅ **Order Matching Engine** — Real-time limit order matching with price discovery
- ✅ **Admin Dashboard** — Event management, contract monitoring, settlement controls
- ✅ **On-chain Wallet per User** — Each user gets a Polygon wallet with private key export
- ✅ **Gas Fee Sponsorship** — Platform covers all gas fees for users
- ✅ **Multi-language** — English, Chinese, and 10+ languages
- ✅ **Mobile APP** — Android APK via Capacitor
- ✅ **Java Backend** — Spring Boot + MyBatis, battle-tested in production
- ✅ **Oracle Integration** — Event resolution with dispute mechanism
- ✅ **Complete API** — REST API for all operations

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/zeryswin168/polymarket-clone.git
cd polymarket-clone

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open http://localhost:5173 in your browser.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   Frontend (Vue 3)               │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Markets  │  │  Detail  │  │  Portfolio   │  │
│  │  List     │  │  + Order │  │  + Wallet    │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
└─────────────────────┬───────────────────────────┘
                      │ REST API
┌─────────────────────┴───────────────────────────┐
│               Backend (Spring Boot)              │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Order   │  │  Chain   │  │  Admin       │  │
│  │  Engine  │  │  Service │  │  Controller  │  │
│  └──────────┘  └────┬─────┘  └──────────────┘  │
└──────────────────────┼──────────────────────────┘
                       │ Web3 / RPC
┌──────────────────────┴──────────────────────────┐
│            Polygon Blockchain                    │
│  ┌──────────────────────────────────────────┐   │
│  │  BetMarketV1 (UUPS Proxy)               │   │
│  │  - placeBet()    - settleEvent()         │   │
│  │  - USDT Escrow   - Automated Payout      │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## 📸 Screenshots

<p align="center">
  <img src="screenshots/home.png" width="300" alt="Markets - Browse prediction events" />
  &nbsp;&nbsp;&nbsp;
  <img src="screenshots/portfolio.png" width="300" alt="Portfolio - Wallet, positions, P&L" />
</p>

| Markets Page | Portfolio Page |
|:---:|:---:|
| Browse events, buy Yes/No shares | Polygon wallet, holdings, P&L chart |

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vue 3, Vite, Vant UI, Vue Router |
| Backend | Java, Spring Boot, MyBatis (Full version) |
| Blockchain | Polygon, Solidity, Hardhat, UUPS Proxy |
| Database | MySQL (Full version) |
| Mobile | Capacitor (Android/iOS) |
| Contract | BetMarketV1 — USDT escrow + settlement |

---

## 💰 How It Works

1. **Create Market** — Admin creates prediction event (e.g., "Will BTC reach $150K?")
2. **Place Bets** — Users buy YES or NO shares at their chosen price
3. **Order Matching** — Backend matches opposing orders in real-time
4. **On-chain Record** — Matched bets are recorded on Polygon via smart contract
5. **Settlement** — When event resolves, contract automatically pays winners
6. **Withdraw** — Users withdraw USDT to any Polygon wallet

---

## 🌍 Prediction Market Landscape

This project is inspired by the leading prediction market platforms:

| Platform | Chain | Model | Status |
|----------|-------|-------|--------|
| [Polymarket](https://polymarket.com) | Polygon | CLOB + Gnosis CTF | 🟢 #1 by volume, $1B+ monthly |
| [Kalshi](https://kalshi.com) | Off-chain | CFTC-regulated exchange | 🟢 US-regulated, real-money |
| [Azuro](https://azuro.org) | Polygon, Gnosis | Liquidity pool + AMM | 🟢 DeFi-native, permissionless |
| [Overtime Markets](https://overtimemarkets.xyz) | Optimism, Arbitrum | Thales AMM | 🟢 Sports-focused |
| [Augur](https://augur.net) | Ethereum | Fully decentralized | 🔴 Inactive (pioneer, launched 2018) |
| [Gnosis / Omen](https://omen.eth.limo) | Gnosis Chain | CTF + AMM | 🟡 Low activity |
| [Hedgehog](https://hedgehog.markets) | Solana | Parimutuel pools | 🟡 Solana ecosystem |
| [PlotX](https://plotx.io) | Polygon | AMM-based | 🔴 Discontinued |
| **This Project** | **Polygon** | **CLOB + Smart Contract Escrow** | **🟢 Open Source** |

### Why build your own?

- **Polymarket** is closed-source and US-restricted — you can't customize or deploy it
- **Kalshi** requires CFTC license — not accessible for most teams
- **Augur/Omen** are fully on-chain — slow and expensive for real users
- **This project** gives you a production-ready, customizable platform you own and control

---


The complete production-ready platform includes:

- **Smart Contract** — Audited BetMarketV1 with UUPS upgrade support
- **Java Backend** — Complete REST API with order matching, settlement, admin
- **Admin Panel** — Vue-based dashboard for event/contract/user management
- **Mobile App** — Android APK ready for distribution
- **Deployment Scripts** — Hardhat deploy/upgrade, Docker configs

### 📧 Contact Us

For the full version, deployment support, or custom development:

- **Telegram**: [@haodehao68](https://t.me/haodehao68)
- **WhatsApp**: [+852 9700 7397](https://wa.me/85297007397)
- **WeChat**: zeryshao666

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⭐ Star This Repo

If you find this useful, please give it a ⭐ — it helps others discover this project!

---

*Built with ❤️ for the prediction market community*

---

## 🇨🇳 中文说明

**Polymarket 开源克隆版** — 基于 Polygon 链的预测市场平台。

- 链上 USDT 智能合约托管，资金透明安全
- 自动结算，赢家直接收到 USDT
- UUPS 可升级合约，支持热更新
- 限价订单撮合引擎，实时成交
- 移动端 H5 + Android APK
- Java 后端 + Vue 3 前端 + Solidity 合约
- 支持多语言（中文/英文/日文等10+语种）

**关键词**: 预测市场, Polymarket 克隆, 区块链博彩, 去中心化, 智能合约, 链上投注, Web3 预测, 加密货币, USDT 托管, Polygon, DeFi, 开源预测平台, 二元期权, 事件预测

**完整版请联系我们获取**，包含后端源码、管理后台、合约部署脚本、技术支持。

- **Telegram**: [@haodehao68](https://t.me/haodehao68)
- **WhatsApp**: [+852 9700 7397](https://wa.me/85297007397)
- **微信**: zeryshao666
