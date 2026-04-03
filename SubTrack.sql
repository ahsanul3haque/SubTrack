-- Create the database and use it
CREATE DATABASE IF NOT EXISTS SubTrack;
USE SubTrack;

-- Drop existing tables to avoid errors during testing
DROP TABLE IF EXISTS User_Subscriptions;
DROP TABLE IF EXISTS Services;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Users;

-- ==========================================
-- TABLE CREATION 
-- ==========================================

CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(150) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    JoinDate DATE NOT NULL
);

CREATE TABLE Categories (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryName VARCHAR(80) NOT NULL
);

CREATE TABLE Services (
    ServiceID INT AUTO_INCREMENT PRIMARY KEY,
    ServiceName VARCHAR(120) NOT NULL,
    DefaultWebsite VARCHAR(200),
    CategoryID INT,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

CREATE TABLE User_Subscriptions (
    SubscriptionID INT AUTO_INCREMENT PRIMARY KEY,
    BillingAmount DECIMAL(10,2) NOT NULL,
    BillingCycle VARCHAR(20) NOT NULL, 
    NextBillingDate DATE NOT NULL,
    IsFreeTrial BOOLEAN NOT NULL DEFAULT FALSE,
    Status VARCHAR(20) NOT NULL,
    UserID INT,
    ServiceID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ServiceID) REFERENCES Services(ServiceID)
);

-- ==========================================
-- INSERTING EXTENSIVE SAMPLE DATA
-- ==========================================

-- 1. Insert Users (Including a user with zero subscriptions for testing)
INSERT INTO Users (Name, Email, PasswordHash, JoinDate) VALUES 
('Ahsanul Haque', 'ahsanul@student.nsu.edu', 'hash123', '2026-01-15'),
('Nafisa Nawal Erisha', 'erisha@student.nsu.edu', 'hash456', '2026-01-16'),
('John Doe', 'john.doe@email.com', 'hash789', '2026-02-10'),
('Jane Smith', 'jane.smith@email.com', 'hash321', '2026-02-22'),
('Michael Scott', 'mscott@dundermifflin.com', 'hash654', '2026-03-05'),
('Empty Tester', 'notrials@email.com', 'hash999', '2026-03-25'); -- Has no subscriptions

-- 2. Insert Categories
INSERT INTO Categories (CategoryName) VALUES 
('Entertainment'),          -- 1
('Music & Audio'),          -- 2
('Productivity & Design'),  -- 3
('Cloud Storage'),          -- 4
('Gaming'),                 -- 5
('Education');              -- 6

-- 3. Insert Services 
INSERT INTO Services (ServiceName, DefaultWebsite, CategoryID) VALUES 
('Netflix', 'https://www.netflix.com', 1),                -- 1
('Disney+', 'https://www.disneyplus.com', 1),             -- 2
('Hulu', 'https://www.hulu.com', 1),                      -- 3
('Spotify Premium', 'https://www.spotify.com', 2),        -- 4
('Apple Music', 'https://music.apple.com', 2),            -- 5
('Onshape', 'https://www.onshape.com', 3),                -- 6
('Adobe Creative Cloud', 'https://www.adobe.com', 3),     -- 7
('Notion', 'https://www.notion.so', 3),                   -- 8
('Google One', 'https://one.google.com', 4),              -- 9
('Dropbox', 'https://www.dropbox.com', 4),                -- 10
('Xbox Game Pass', 'https://www.xbox.com', 5),            -- 11
('Duolingo Super', 'https://www.duolingo.com', 6);        -- 12

-- 4. Insert User_Subscriptions (Testing various edge cases)
-- Remember: IsFreeTrial uses 1 for TRUE, 0 for FALSE
INSERT INTO User_Subscriptions (BillingAmount, BillingCycle, NextBillingDate, IsFreeTrial, Status, UserID, ServiceID) VALUES 
-- Ahsanul's Subscriptions (Mix of Monthly, Yearly, and Canceled)
(15.49, 'Monthly', '2026-04-15', 0, 'Active', 1, 1),   -- Netflix
(0.00, '14 Days', '2026-04-12', 1, 'Active', 1, 6),    -- Onshape (Free Trial)
(10.99, 'Monthly', '2026-02-15', 0, 'Canceled', 1, 4), -- Spotify (Canceled)

-- Erisha's Subscriptions (High value Yearly, Active trials)
(13.99, 'Monthly', '2026-04-20', 0, 'Active', 2, 2),   -- Disney+
(29.99, 'Yearly', '2027-01-16', 0, 'Active', 2, 9),    -- Google One
(0.00, '7 Days', '2026-04-05', 1, 'Active', 2, 12),    -- Duolingo (Free Trial)

-- John's Subscriptions (Mostly gaming and entertainment)
(16.99, 'Monthly', '2026-04-10', 0, 'Active', 3, 11),  -- Xbox Game Pass
(15.49, 'Monthly', '2026-03-10', 0, 'Expired', 3, 1),  -- Netflix (Expired)
(10.99, 'Monthly', '2026-04-10', 0, 'Active', 3, 5),   -- Apple Music

-- Jane's Subscriptions (Productivity focused)
(54.99, 'Monthly', '2026-04-22', 0, 'Active', 4, 7),   -- Adobe CC
(100.00, 'Yearly', '2027-02-22', 0, 'Active', 4, 8),   -- Notion
(11.99, 'Monthly', '2026-04-22', 0, 'Active', 4, 10),  -- Dropbox

-- Michael's Subscriptions (A bit of everything)
(13.99, 'Monthly', '2026-04-05', 0, 'Active', 5, 2),   -- Disney+
(7.99, 'Monthly', '2026-04-05', 0, 'Active', 5, 3),    -- Hulu
(10.99, 'Monthly', '2026-01-05', 0, 'Canceled', 5, 4), -- Spotify (Canceled)
(16.99, 'Monthly', '2026-04-05', 0, 'Active', 5, 11);  -- Xbox Game Pass

-- Notice User 6 ('Empty Tester') is intentionally left out to test ZERO subscriptions!