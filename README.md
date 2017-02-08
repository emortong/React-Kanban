# React Kanban
> A digital Kanban board made with React

![kanban_guide_print_kpo_bleed_board2-1024x517](https://cloud.githubusercontent.com/assets/4650739/15059276/3bb2092e-12bd-11e6-9c12-d92747e77bc5.jpg)

> "The Kanban technique emerged in the late 1940s as Toyota’s reimagined approach to manufacturing and engineering. ... The system’s highly visual nature allowed teams to communicate more easily on what work needed to be done and when. It also standardized cues and refined processes, which helped to reduce waste and maximize value." - [via LeanKit.com](http://leankit.com/learn/kanban/kanban-board/)

## Getting Started

- Fork and clone
- Rename `config/configExample.json` to `config/config.json`, in this same file, set your username where it is indicated
- Run `npm install` to install all your dependencies
- Create a database for the project in Postgres. Name it `kanban`
- Connect to `kanban`
- Run `sequelize db:migrate` in your terminal
- Run `node server.js`
- Go to `localhost:3000` in your browser
- Click on `new task` and start adding tasks to your Kanban board!
