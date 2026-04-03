# 📊 SubTrack — Subscription & Free Trial Manager

**CSE311L: Database Systems Lab | Group 10 | Section 06**
North South University — Department of Electrical & Computer Engineering

---

## 🌐 Live Demo
> **Access the Web UI here:** [https://ahsanul3haque.github.io/SubTrack/](https://ahsanul3haque.github.io/SubTrack/)

---

## 📋 Project Overview
SubTrack is a web-based client-side application designed to help users seamlessly manage recurring digital subscriptions, track free trials before they auto-charge, and analyze monthly/yearly spending. 

To satisfy the static GitHub Pages deployment requirement, this UI simulates our SQL Database schema entirely in the browser using `localStorage`.

---

## 🚀 Usage & Navigation (Features)
Once logged in, you can navigate through the application using the left sidebar:

* 🏠 **Dashboard:** Get a high-level overview of your active subscriptions, total monthly/yearly costs, and a quick-glance warning of free trials expiring within 7 days.
* 📦 **My Subscriptions:** View, filter, add, edit, and delete your subscriptions. You can select from pre-loaded services or create **custom services and categories** on the fly.
* ⏰ **Free Trials Tracker:** A dedicated tracker sorted by urgency. Visual progress bars and countdown indicators warn you exactly how many days you have left to cancel before being charged.
* 📊 **Analytics:** Interactive Doughnut and Bar charts breaking down your expenses by category and billing cycle.
* 🛍️ **Service Catalog:** Browse a directory of popular digital services (Netflix, Adobe, Spotify, etc.) and add them to your tracking portfolio with one click.

---

## 🔑 Demo Login Credentials
The database comes pre-seeded with test users. You can use any of the accounts below to test the application (Password for all: **demo123**):

| Name | Email | Password |
|------|-------|----------|
| Ahsanul Haque | ahsanul@student.nsu.edu | demo123 |
| Nafisa Nawal Erisha | erisha@student.nsu.edu | demo123 |
| John Doe | john.doe@email.com | demo123 |

---

## 👥 Team Members
| Name | Student ID | Role |
|------|-----------|------|
| Ahsanul Haque | 2411830642 | Database Designer & Backend Developer |
| Nafisa Nawal Erisha | 2413455642 | Frontend Developer & Authentication |

---

## 🗄️ Database Schema (localStorage implementation)
This UI simulates the exact SQL ERD using browser storage:
* `Users` (UserID, Name, Email, PasswordHash, JoinDate)
* `Categories` (CategoryID, CategoryName)
* `Services` (ServiceID, ServiceName, DefaultWebsite, CategoryID [FK])
* `User_Subscriptions` (SubscriptionID, BillingAmount, BillingCycle, NextBillingDate, IsFreeTrial, Status, UserID [FK], ServiceID [FK])

---

## 🛠️ Technologies Used
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (No frameworks)
* **Data Persistence:** Browser `localStorage` API
* **Charting:** Chart.js (via CDN)
* **Typography:** Google Fonts (Outfit & JetBrains Mono)

---
*Submitted for CSE311L Web UI Assignment |
