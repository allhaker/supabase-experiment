# Supabase Experiment

### Technologies Used

- **React**
- **Material UI**
- **Supabase**: An open-source Firebase alternative for building secure and scalable applications.
- **Supabase Serverless**: Serverless functions provided by Supabase for backend logic.
- **Node.js**
- **Postgres**

### Run Frontend
To run the frontend of the project, follow these steps:

1. **Install Dependencies**:
    ```bash
    nvm install # NVM install instuctions can be found here https://github.com/nvm-sh/nvm
    nvm use
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Start the Development Server**:
    ```bash
    npm start
    ```

4. **Open Your Browser**:
    Navigate to `http://localhost:3000` to view the application.

You should be able to run Frontend out of the box. I used Supabase for the backend. Everything is deployed and all the credentials are baked in, which is something I'd never do for any real production app.

### Run Backend
Supabase is used to run backend.
https://supabase.com/

I did not spend time trying to run supabase locally since deployment to production is so easy once you have your account set up on supabase. These commands below should help to set up to run supabase locally but I have not tested them.

```bash
    supabase start
    supabase seed
```

Best way to test backend is via the frontend app.


### Discussion

1. I targeted towards speed and with supabase I was able to setup a project very quickly and even deploy the backend.
2. I chose to have a 2 step process for data handling. First, we generate alignment, denormalize it and fetch easil and efficiently on the frontend.
3. I did not implment product tree structure due to time constraints. In the real world I would done some ETL and got the parent data to trickly down to children in my data pipeline since that is a lot easier to work with.
4. There are no tests in my app due to time limitations. We can discuss my test plan on the interview.
5. My application is heavier on the in-code data-processing rather than more complex SQL queries since as I mentioned SQL is not my strong suit. However, given more time I could have probably changed alignment by company processing from code to SQL but it's actually not entirely clear how benefitial would that be since JS code is extremely easy to scale unlike SQL.
6. In a real world I would have had the data processing job to run on a given cadence. I can then batch the job by companies so that I don't process all at the same time. I could then use a queue mechanism to process the data gradually. My code would support that with minimal intevention. I would put the processed data to the data-lake or maybe even in a document db like Mongo. And of course I would have a multiple step data pipeline to keep processing data to a more refine format to make processing on each step as efficient as possible.

### Docs

#### Technical Drawing

![Technical Diagram](Screenshot%202025-02-06%20at%2010.34.20.png)

#### DB Schema

![Technical Diagram](Screenshot%202025-02-06%20at%2010.34.35.png)
