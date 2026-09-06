# Moodboard Studio

A visual reference board designed to bring together **visual research, organization and creative exploration** in one focused interface.

Moodboard Studio was created as a Front-end project with a strong emphasis on **visual direction, interaction design and component-based development**. The goal was to build something that feels like a real creative tool rather than a conventional CRUD application.

## Preview

![Moodboard Studio — Preview 1](./screenshots/Print 1.png)

![Moodboard Studio — Preview 2](./screenshots/Print 2.png)

## Overview

Moodboard Studio allows users to collect and organize visual references while maintaining a clean and expressive workspace.

The project explores how a digital interface can support a creative process without getting in the way of the content itself.

The visual direction combines **editorial design, contemporary visual culture and digital moodboarding**, with particular attention to typography, image hierarchy, spacing and interaction.

## Features

* Add visual references through image URLs
* Preview images before adding them
* Validate image URLs and loading states
* Add titles and categories to references
* Display references in a responsive visual grid
* Search and filter references
* Sort the collection
* Reorder references through drag and drop
* Open images in a lightbox
* Delete references with confirmation
* Persist the moodboard using `localStorage`
* Responsive interface for different screen sizes
* Microinteractions and visual feedback

## Design

The interface was designed around the idea that **the images should remain the protagonists**.

Instead of following the visual language of a traditional dashboard, the project uses an editorial-inspired approach with:

* Strong typographic hierarchy
* Carefully controlled spacing
* Image-based visual hierarchy
* Structured grid composition
* Restrained interface elements
* Sophisticated color relationships
* Subtle interaction feedback

The design process was strongly influenced by my background in **Arts and Design**, bringing visual composition and art direction into the development process.

The objective was not simply to make the interface functional, but to make the interaction with the collection itself feel intentional.

## Tech Stack

### Front-end

* React 19
* Vite
* JavaScript
* HTML5
* CSS3

### Development

* ESLint
* React Hooks
* Browser `localStorage` API

No UI framework was used. The interface was built with React and custom CSS to maintain control over the visual language and interactions.

## Architecture

The application is organized around reusable React components, separating the main interface responsibilities.

```text
src/
├── components/
│   ├── AddReference/
│   ├── Header/
│   └── Moodboard/
├── App.jsx
├── App.css
└── main.jsx
```

The main application is responsible for managing the collection state and persistence, while individual components handle specific interface responsibilities.

This structure keeps the project simple while providing a foundation that can be expanded as the application grows.

## State & Persistence

The moodboard collection is managed through React state.

References are persisted using the browser's `localStorage`, allowing the collection to remain available after refreshing or reopening the page.

This approach was intentionally kept client-side because the project's focus is on **front-end architecture and interaction design**, rather than backend infrastructure.

## UX Considerations

Several interaction details were implemented to make the experience feel more deliberate:

* Images are validated before a reference can be added.
* Users receive visual feedback when a reference is successfully created.
* Destructive actions require confirmation.
* The delete modal can be dismissed without completing the action.
* Empty states communicate what the user can do next.
* The interface adapts to smaller screens rather than simply shrinking the desktop layout.

These decisions were made to keep the interface clear while preserving its visual character.

## What I Wanted to Explore

This project was an opportunity to explore a question that sits between my two areas of interest:

> **How can Front-end development become part of the visual design process rather than simply implementing a finished design?**

Moodboard Studio approaches the interface as a designed environment.

The project therefore combines:

**Design thinking → visual direction → interaction → React implementation**

rather than treating these as completely separate stages.

## Challenges

One of the main challenges was balancing **expressive visual design with usability**.

A moodboard interface can easily become either too rigid and application-like or too experimental to remain practical. The project therefore required careful decisions around hierarchy, spacing, image proportions and interaction patterns.

Another challenge was maintaining a simple React architecture while progressively adding interactions and state-dependent behavior.

## What I Learned

Through this project, I practiced:

* Building reusable React components
* Managing application state with React Hooks
* Persisting client-side data
* Handling image loading and validation
* Designing interaction states
* Building responsive layouts with CSS
* Thinking about component architecture alongside visual design
* Translating an art direction into an interactive interface

Most importantly, the project reinforced my interest in working at the intersection of **Front-end development, UX/UI and visual design**.

## Running Locally

Clone the repository and install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

To create a production build:

```bash
npm run build
```

To run ESLint:

```bash
npm run lint
```

## Project Status

Moodboard Studio is a completed portfolio project.

The current version focuses on the core moodboarding experience, visual direction and front-end implementation.

Future iterations could explore additional forms of visual organization and creative tooling, but the current version intentionally keeps the experience focused.

## Author

**Valentina Gomes**

Arts & Design graduate with a focus on **UX/UI and Front-end development**.

This project represents my interest in combining visual thinking and technical implementation to create interfaces that are both functional and aesthetically intentional.
