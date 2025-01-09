# Mazaady Portal - Frontend Task

This repository contains the frontend solution for the Mazaady Portal task, developed using **React**, **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Task Implementation

### 1. **Dynamic Form**

In this project, I implemented a **dynamic form** that includes two dropdown menus: one for selecting a **Main Category** and another for selecting a **Subcategory**. The form dynamically updates based on user selection:

- The **Main Category Dropdown** is populated with a list of all categories fetched from an API.
- Once the user selects a **Main Category**, the **Subcategory Dropdown** is populated with subcategories specific to that category.
- After selecting a subcategory, properties related to that category are dynamically displayed.

For each property:

- I added an **"Other"** option to allow users to enter custom values. When "Other" is selected, an input field appears for the user to type their value.

### 2. **Parent-Child Property Structure**

Some properties in the form have a **parent-child relationship**:

- When a property is selected, it can trigger additional child properties to be displayed, fetched from the API.
- For example, selecting **Brand** will display the **Model** property, and selecting **Model** may reveal the **Type** property.

This hierarchical structure allows for dynamic and flexible property selection.

### 3. **Submit and Display Data**

Once the user completes the form, they can submit it. The form data is then displayed in a table, showing the selected key-value pairs for all properties.

### 4. **API Integration**

I integrated the following APIs into the application to fetch categories, properties, and child options dynamically:

- **Get All Categories**: Fetches the list of all categories.
- **Get Properties by Subcategory**: Fetches the properties of the selected subcategory.
- **Get Child Options**: Fetches child options for a selected property, if applicable.

### 5. **State Management and User Interaction**

I used **React's useState** and **useEffect** hooks for managing the state of the form:

- **Dynamic Form Updates**: Based on user interaction, the form updates the dropdown menus, properties, and child options.

---

## Features

- **Dynamic Dropdown Menus**: The form dynamically updates based on selected categories and subcategories.
- **Parent-Child Property Relationships**: Properties are organized hierarchically, with child properties being dynamically loaded when necessary.
- **Searchable Dropdown**: Both dropdown menus are searchable for a better user experience.
- **Custom Input for "Other" Option**: An input field appears when the "Other" option is selected for a property.
- **Submit Form**: Displays the selected key-value pairs in a table upon form submission.

---

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Typed superset of JavaScript for better code quality and maintainability.
- **Tailwind CSS**: Utility-first CSS framework for styling.

---

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/ahmed-kkamel/fe-mazzady-task.git

   ```

2. Install the dependencies:

   ```bash
    cd fe-mazzady-task
    npm install

   ```

3. Run the application:
   ```bash
      npm run dev
      Open the app in your browser at http://localhost:3000.
   ```

---

## Live Preview

You can view a live preview of the project here: [Live Preview](https://mazzady-task-ruby.vercel.app/)
