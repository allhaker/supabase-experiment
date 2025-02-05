import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'
import { Company, Goal, GoalAlignment, ParsedGoalAlignment } from './types'
import { Button, Divider, Grid2, LinearProgress, List, ListItem, ListItemText, Typography } from '@mui/material'

const SUPABASE_URL = 'https://blqqpajkzcgdpgvjyhwz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJscXFwYWpremNnZHBndmp5aHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MDQ5MjMsImV4cCI6MjA1NDA4MDkyM30.BYfwMfyHp9Ec1IVCxQ35nb2QMJdOng1Y3E-pp3o9OAY';
const SUPABASE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJscXFwYWpremNnZHBndmp5aHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MDQ5MjMsImV4cCI6MjA1NDA4MDkyM30.BYfwMfyHp9Ec1IVCxQ35nb2QMJdOng1Y3E-pp3o9OAY';

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

async function clearGoalAlignmentData() {
  const { error } = await supabase
    .from('goal_alignment')
    .delete()
    .neq('id', 0);

  if (error) {
    throw error;
  }
}

async function calculateData() {
  const url = `${SUPABASE_URL}/functions/v1/process-data`;
  const token = SUPABASE_TOKEN;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return await response.json();
}

const getGoalAlignments = async () => {
  const { data, error } = await supabase
    .from("goal_alignment")
    .select("*");

  if (error) {
    throw error;
  }

  const goalAlignments = data.map((goalAlignment) => ({
    company: goalAlignment.company as Company,
    goalAlignment: goalAlignment.goal_alignment as GoalAlignment,
    companyID: goalAlignment.company_id,
    createdAt: goalAlignment.created_at,
    id: goalAlignment.id,
  }));

  return goalAlignments;
};


function DataControl({ setAlignmentData }: { setAlignmentData: () => void }) {
  return (
    <>
      <Typography variant="h2">
          SDG Data Control
      </Typography>
      <Grid2 container spacing={2} justifyContent="center" alignItems="center">
        <Grid2>
          <Button variant="contained" fullWidth onClick={() => clearGoalAlignmentData()}>
            Clear Alignment Data
          </Button>
        </Grid2>
        <Grid2>
          <Button variant="contained" fullWidth onClick={() => calculateData()}>
            Calculate Alignment Data
          </Button>
        </Grid2>
        <Grid2>
          <Button variant="contained" fullWidth onClick={() => setAlignmentData()}>
            Fetch Alignment Data
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
}

function CompaniesList({ companies, setCompanyAlignmentData }: { companies: Company[], setCompanyAlignmentData: (companyId: number) => void }) {
  return (
    <>
      <Typography variant="h2">
          Let's check company SDG Alignment
      </Typography>
      <Grid2 container spacing={2} justifyContent="center" alignItems="center">
        {companies.map((company) => (
          <Grid2 key={company.id}>
            <Button variant="contained" fullWidth onClick={() => setCompanyAlignmentData(company.id)}>
              {company.name}
            </Button>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}

function CompanyAlignment({ companyAlignment }: { companyAlignment: ParsedGoalAlignment | undefined }) {
  if (!companyAlignment) {
    return <Typography variant="h6">Select a company to view alignment data.</Typography>;
  };

  return (
    <div>
      <Typography variant="h4">Company Alignment Data</Typography>
      {Object.entries(companyAlignment.goalAlignment).map(([goalId, alignment]) => (
        <div key={goalId}>
          <Typography variant="h6">{alignment.goal.goal}</Typography>
          <LinearProgress variant="determinate" value={alignment.totalAlignment} />
          <Typography variant="body2">{alignment.totalAlignment}%</Typography>
        </div>
      ))}
    </div>
  );
}

function UNList({ goals }: { goals: Goal[] }) {
  return (
    <List>
      <Typography variant="h2">
          Company Impact Alignment to UN SDGs
      </Typography>
      <Typography variant="h2">
          List of UN SDGs
      </Typography>
      { goals.map((goal) => (
        <ListItem key={goal.id}>
          <ListItemText primary={goal.name} sx={{ textAlign: 'center' }} />
        </ListItem>
      ))}
    </List>
  );
}

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [alignments, setAlignments] = useState<ParsedGoalAlignment[]>([]);
  const [companyAlignment, setCompanyAlignment] = useState<ParsedGoalAlignment | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("company")
        .select("*");

      if (error) {
        throw error;
      }
      if (data?.length === 0) throw new Error("No companies");

      setCompanies(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("goal")
        .select("*");

      if (error) {
        throw error;
      }
      if (data?.length === 0) throw new Error("No companies");

      setGoals(data);
    };

    fetchData();
  }, []);

  const setAlignmentData = useCallback(async () => {
    const alignmentData = await getGoalAlignments();
    setAlignments(alignmentData);
  }, [setAlignments]);

  const setCompanyAlignmentData = useCallback((companyId: number) => {
    const companyAlignmentData = alignments.find((alignment) => alignment.company.id === companyId);
    setCompanyAlignment(companyAlignmentData);
  }, [setCompanyAlignment, alignments]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <DataControl setAlignmentData={setAlignmentData} />
      <CompaniesList companies={companies} setCompanyAlignmentData={setCompanyAlignmentData} />
      <CompanyAlignment companyAlignment={companyAlignment} />
      <Divider sx={{ my: 4, borderBottomWidth: 2, borderColor: 'primary.main' }} />
      <UNList goals={goals}/>
    </>
  )
}

export default App
