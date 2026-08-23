# SERVERLESS DEPLOYMENT OF A WEB APPLICATION USING AWS S3

**A PROJECT REPORT**

Submitted by

**Aman Patel (23BCS11665)**
**Vardan Agarwal (23BCS11966)**
**Sarthak Kumar Saini (23BCS11582)**

in partial fulfillment for the award of the degree of

**BACHELOR OF ENGINEERIN**
IN
**COMPUTER SCIENCE AND ENGINEERING**

Course: Cloud Computing

**Chandigarh University**
**April 2026**

---

## BONAFIDE CERTIFICATE

Certified that this project report **"Serverless Deployment of a Web Application using AWS S3"** is the bonafide work of **"Aman Patel (23BCS11665), Vardan Agarwal (23BCS11966), and Sarthak Kumar Saini"**.

---

## ACKNOWLEDGEMENT

We express our sincere gratitude to **Ms. Alka Jaswal**, our project supervisor, for her constant guidance and support throughout the course of this project.

We also thank Prof. Gagandeep Singh, Head of the Department of Computer Science and Engineering, Chandigarh University, for providing a supportive academic environment.

Finally, we thank our family and friends for their encouragement throughout this work.

- Aman Patel
- Vardan Agarwal
- Sarthak Kumar Saini

---

## TABLE OF CONTENTS

1. [CHAPTER 1: INTRODUCTION](#chapter-1-introduction)
2. [CHAPTER 2: ARCHITECTURE AND DESIGN](#chapter-2-architecture-and-design)
3. [CHAPTER 3: IMPLEMENTATION AND VALIDATION](#chapter-3-implementation-and-validation)
4. [CHAPTER 4: CONCLUSION AND FUTURE WORK](#chapter-4-conclusion-and-future-work)
5. [REFERENCES](#references)
6. [APPENDIX: DEPLOYMENT MANUAL](#appendix-deployment-manual)

---

## CHAPTER 1
### INTRODUCTION

#### 1.1 Overview
The era of traditional web hosting requiring dedicated servers is evolving. Cloud computing introduces serverless architectures that offer high availability, infinite scalability, and reduced costs. This project demonstrates the deployment of a modern web application (the KnabanX frontend) using AWS S3 Static Website Hosting. 

#### 1.2 Objective
The primary objective of this project is to successfully host a static web application on the cloud without provisioning or managing any virtual servers (EC2 instances). 

#### 1.3 Scope
The scope covers creating an AWS S3 bucket, configuring it for public website hosting, uploading static assets (HTML, CSS, JavaScript), and defining appropriate IAM bucket policies to make the application globally accessible.

---

## CHAPTER 2
### ARCHITECTURE AND DESIGN

#### 2.1 Design Constraints
- **Economic Constraint:** The solution must be highly cost-effective, leveraging AWS Free Tier where possible.
- **Maintenance Constraint:** The architecture should require zero server maintenance/patching (Serverless paradigm).

#### 2.2 Alternative Designs
**Alternative 1: Traditional EC2 Hosting**
Deploying an EC2 virtual machine, installing Nginx/Apache, and hosting the files.
- *Pros:* Complete control over the OS and web server.
- *Cons:* Overkill for static files, requires OS patching, lacks automatic high availability.

**Alternative 2: AWS S3 Static Website Hosting (Selected)**
Uploading static assets directly to an S3 bucket configured for web hosting.
- *Pros:* Zero maintenance, scales infinitely, extremely cost-effective.
- *Cons:* Only supports static files (HTML/CSS/JS)—backend logic must be handled via APIs.

#### 2.3 Selected Architecture Implementation Plan
1. **S3 Bucket Creation:** Provision an S3 bucket with a globally unique name.
2. **Access Configuration:** Unblock public access settings.
3. **Bucket Policy:** Attach a JSON policy to allow `s3:GetObject` on all bucket assets.
4. **Asset Upload:** Upload the frontend folder of the project.
5. **Endpoint Generation:** Retrieve the S3 website endpoint URL for public access.

---

## CHAPTER 3
### IMPLEMENTATION AND VALIDATION

#### 3.1 Tools and Platforms Used
- **Cloud Provider:** Amazon Web Services (AWS)
- **Service:** Amazon Simple Storage Service (S3)
- **Application Stack:** HTML5, CSS3, Vanilla JavaScript 

---

