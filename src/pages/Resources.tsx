import React from 'react';
import { 
  Container, Typography, Box, Grid, Card, CardContent, 
  CardActions, Button, Divider, List, ListItem, 
  ListItemIcon, ListItemText, Link, Accordion, AccordionSummary, AccordionDetails,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper as MuiPaper, Avatar
} from '@mui/material';
// @ts-ignore
import DescriptionIcon from '@mui/icons-material/Description';
// @ts-ignore
import LinkIcon from '@mui/icons-material/Link';
// @ts-ignore
import SchoolIcon from '@mui/icons-material/School';
// @ts-ignore
import WorkIcon from '@mui/icons-material/Work';
// @ts-ignore
import HomeIcon from '@mui/icons-material/Home';
// @ts-ignore
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
// @ts-ignore
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// @ts-ignore
import BusinessIcon from '@mui/icons-material/Business';
// @ts-ignore
import AssessmentIcon from '@mui/icons-material/Assessment';
// @ts-ignore
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// @ts-ignore
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// @ts-ignore
import YouTubeIcon from '@mui/icons-material/YouTube';
// @ts-ignore
import FacebookIcon from '@mui/icons-material/Facebook';
// @ts-ignore
import PetsIcon from '@mui/icons-material/Pets';
// @ts-ignore
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface ResourceItem {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}

interface ServiceProvider {
  name: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  notes?: string;
  category: string;
}

interface YouTubeChannel {
  name: string;
  description: string;
  link: string;
}

interface OccupationItem {
  anzsco: string;
  title: string;
  list: 'MLTSSL' | 'STSOL' | 'ROL';
  assessingAuthority: string;
}

const Resources: React.FC = () => {
  const officialResources: ResourceItem[] = [
    {
      title: 'Department of Home Affairs',
      description: 'Official Australian government site for immigration and citizenship',
      link: 'https://immi.homeaffairs.gov.au/',
      icon: <AccountBalanceIcon />
    },
    {
      title: 'SkillSelect',
      description: 'Express your interest in skilled migration to Australia',
      link: 'https://immi.homeaffairs.gov.au/visas/working-in-australia/skillselect',
      icon: <WorkIcon />
    },
    {
      title: 'Visa Finder',
      description: 'Find the right Australian visa for your circumstances',
      link: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder',
      icon: <DescriptionIcon />
    },
    {
      title: 'Australian Skills Authority',
      description: 'Information about skills assessment for migration',
      link: 'https://www.vetassess.com.au/',
      icon: <SchoolIcon />
    }
  ];

  const livingInAustraliaResources: ResourceItem[] = [
    {
      title: 'Study in Australia',
      description: 'Information about studying in Australia',
      link: 'https://www.studyinaustralia.gov.au/',
      icon: <SchoolIcon />
    },
    {
      title: 'Medicare',
      description: 'Australia\'s public health insurance system',
      link: 'https://www.servicesaustralia.gov.au/medicare',
      icon: <LocalHospitalIcon />
    },
    {
      title: 'Seek - Job Search',
      description: 'Australia\'s largest job search site',
      link: 'https://www.seek.com.au/',
      icon: <WorkIcon />
    },
    {
      title: 'Domain - Property Search',
      description: 'Find properties to rent or buy in Australia',
      link: 'https://www.domain.com.au/',
      icon: <HomeIcon />
    },
    {
      title: 'Realestate.com.au',
      description: 'Australia\'s leading property portal for buying, selling, or renting',
      link: 'https://www.realestate.com.au/',
      icon: <HomeIcon />
    }
  ];

  const communityResources: ResourceItem[] = [
    {
      title: 'Poms in Oz Forum',
      description: 'Forum for UK expats in Australia',
      link: 'https://www.pomsinoz.com/',
      icon: <LinkIcon />
    },
    {
      title: 'Expat Forum',
      description: 'General forum for expats in Australia',
      link: 'https://www.expatforum.com/forums/australia-expat-forum-for-expats-living-in-australia.6/',
      icon: <LinkIcon />
    },
    {
      title: 'British Expats',
      description: 'Forum for British expats worldwide, with active Australia sections',
      link: 'https://britishexpats.com/forum/australia-27/',
      icon: <LinkIcon />
    }
  ];

  const facebookGroups: ResourceItem[] = [
    {
      title: 'UK to Australia Migration',
      description: 'A dedicated group for UK citizens planning their move to Australia. Get advice on visa applications, skills assessments, and preparing for the big move.',
      link: 'https://www.facebook.com/groups/uktoaustraliamigration',
      icon: <FacebookIcon />
    },
    {
      title: 'Moving to Australia from the UK',
      description: 'Support group specifically for Britons in the planning and preparation stages of emigrating to Australia. Find tips on shipping, documentation, and pre-arrival planning.',
      link: 'https://www.facebook.com/groups/movingtoaustraliafromuk',
      icon: <FacebookIcon />
    },
    {
      title: 'UK to Australia - Skilled Migration Pathway',
      description: 'Focused specifically on skilled migration pathways for UK citizens. Get assistance with occupation lists, points calculations, and visa applications before you move.',
      link: 'https://www.facebook.com/groups/uktoausskilled',
      icon: <FacebookIcon />
    },
    {
      title: 'Pets to Australia - UK Migration',
      description: 'Planning to bring your pet to Australia? This group specializes in the complex process of pet relocation from the UK, including quarantine requirements and preparation.',
      link: 'https://www.facebook.com/groups/petstoaustralia',
      icon: <FacebookIcon />
    },
    {
      title: 'UK Families Moving to Australia',
      description: 'A group for UK families planning their move to Australia. Get advice on schools, healthcare, and family-specific visa requirements before relocating.',
      link: 'https://www.facebook.com/groups/ukfamiliesmovingtoaustralia',
      icon: <FacebookIcon />
    },
    {
      title: 'UK Healthcare Professionals Moving to Australia',
      description: 'For UK doctors, nurses, and other healthcare professionals planning to work in Australia. Get advice on registration, skills assessment, and job opportunities before you move.',
      link: 'https://www.facebook.com/groups/ukhealthmoveaustralia',
      icon: <FacebookIcon />
    }
  ];

  const petRelocationResources: ResourceItem[] = [
    {
      title: 'Department of Agriculture - Pet Imports',
      description: 'Official information on importing pets to Australia',
      link: 'https://www.agriculture.gov.au/biosecurity-trade/cats-dogs',
      icon: <PetsIcon />
    },
    {
      title: 'Jetpets',
      description: 'Pet travel and relocation services to and from Australia',
      link: 'https://www.jetpets.com.au/',
      icon: <PetsIcon />
    },
    {
      title: 'PetAir UK',
      description: 'UK-based pet travel specialists with Australia expertise',
      link: 'https://www.petairuk.com/pet-travel-to-australia/',
      icon: <PetsIcon />
    }
  ];

  const serviceProviders: ServiceProvider[] = [
    {
      name: "VetAssess (Vocational Education and Training Assessment Services)",
      website: "vetassess.com.au",
      phone: "+61 3 9655 4801",
      email: "vetassess@vetassess.com.au",
      address: "Level 5, 478 Albert Street, East Melbourne, VIC 3002, Australia",
      notes: "For UK enquiries, contact during 10 pm–7 am UK time.",
      category: "skills"
    },
    {
      name: "Down Under Centre (UK‑based Australian Immigration Services)",
      website: "downundercentre.com",
      phone: "+44 020 7060 7915",
      email: "info@downundercentre.com",
      address: "48 Queen's Road, Buckhurst Hill, Essex, IG9 5BY, United Kingdom",
      notes: "Office Hours: Monday–Friday, 9 am–5 pm GMT",
      category: "migration"
    },
    {
      name: "True Blue Migration (Australia‑based Migration Agents)",
      website: "truebluemigration.com",
      phone: "Australia: +61 8 6189 5333, UK Office: +44 115 704 3830",
      email: "help@truebluemigration.com",
      address: "Australia: Level 1, 4 Ventnor Avenue, West Perth WA 6005, Australia\nUK: Regus House, Herald Way, Pegasus Business Park, Castle Donington, DE74 2TZ, United Kingdom",
      notes: "All agents are registered with the Migration Agents Registration Authority (MARA).",
      category: "migration"
    },
    {
      name: "Office of the Migration Agents Registration Authority (MARA)",
      website: "mara.gov.au",
      phone: "+61 2 6272 1888",
      email: "mara@homeaffairs.gov.au",
      address: "",
      category: "official"
    },
    {
      name: "Migration Institute of Australia (MIA)",
      website: "mia.org.au",
      phone: "+61 2 9249 9000",
      email: "info@mia.org.au",
      address: "",
      category: "official"
    },
    {
      name: "Australian Computer Society (ACS)",
      website: "acs.org.au",
      phone: "+61 2 9299 3666",
      email: "assessment@acs.org.au",
      address: "",
      category: "skills"
    },
    {
      name: "Engineers Australia",
      website: "engineersaustralia.org.au",
      phone: "+61 2 6270 6555",
      email: "migrationskills@engineersaustralia.org.au",
      address: "",
      category: "skills"
    },
    {
      name: "Trades Recognition Australia (TRA)",
      website: "tradesrecognitionaustralia.gov.au",
      phone: "+61 1300 360 992",
      email: "traenquiries@dese.gov.au",
      address: "",
      category: "skills"
    },
    {
      name: "Australian Institute of Teaching and School Leadership (AITSL)",
      website: "aitsl.edu.au",
      phone: "+61 3 9944 1200",
      email: "migration@aitsl.edu.au",
      address: "",
      category: "skills"
    },
    {
      name: "Australian Health Practitioner Regulation Agency (AHPRA)",
      website: "ahpra.gov.au",
      phone: "+61 3 8708 9001",
      email: "",
      address: "",
      category: "skills"
    },
    {
      name: "Chartered Accountants Australia and New Zealand",
      website: "charteredaccountantsanz.com",
      phone: "+61 2 9290 1344",
      email: "assessment@charteredaccountantsanz.com",
      address: "",
      category: "skills"
    },
    {
      name: "Australia Migration Services UK",
      website: "australiamigration.co.uk",
      phone: "+44 203 0111 574",
      email: "info@australiamigration.co.uk",
      address: "",
      category: "migration"
    },
    {
      name: "The Emigration Group",
      website: "emigrationgroup.com",
      phone: "+44 845 230 4390",
      email: "info@emigrationgroup.com",
      address: "",
      category: "migration"
    },
    {
      name: "Seven Seas Worldwide (International Removals & Shipping)",
      website: "sevenseasworldwide.com",
      phone: "UK: +44 333 733 7337, Australia: +61 3 8340 4900",
      email: "",
      address: "UK: Hythe Road, Smeeth, Kent TN25 6SP\nAustralia: 38 Venture Drive, Sunshine West, Victoria 3020",
      notes: "Offers door-to-door removals, excess baggage shipping, and MoveCube® service for household moves and specialized shipments.",
      category: "shipping"
    },
    {
      name: "Track Financial - Mortgage Services",
      website: "trackfinancial.com",
      phone: "02 8051 3215",
      email: "admin@trackfinancial.com.au",
      address: "",
      notes: "Speak to Ben Schafer for mortgage advice. Book a FREE consultation. Find them on Instagram at track_financial",
      category: "finance"
    },
    {
      name: "Jetpets Pet Travel",
      website: "jetpets.com.au",
      phone: "+61 1300 668 309",
      email: "info@jetpets.com.au",
      address: "Melbourne, Sydney, Brisbane, Perth, Adelaide",
      notes: "Full-service pet travel agency specializing in international pet transport",
      category: "pets"
    },
    {
      name: "PetAir UK",
      website: "petairuk.com",
      phone: "+44 1725 551124",
      email: "enquiries@petairuk.com",
      address: "Unit 2, Salisbury Road Business Park, Pewsey, Wiltshire, SN9 5PZ, UK",
      notes: "Specialists in pet travel to Australia, including quarantine arrangements",
      category: "pets"
    }
  ];

  const youtubeChannels: YouTubeChannel[] = [
    {
      name: "That Johnston Life",
      description: "Helping and inspiring people to move to Australia through practical advice and personal stories.",
      link: "https://www.youtube.com/c/ThatJohnstonLife"
    },
    {
      name: "Living Simply Australia",
      description: "Focused on tips for settling into Australia, from finding accommodation to adapting to local life.",
      link: "https://www.youtube.com/c/LivingSimplyAustralia"
    },
    {
      name: "The Migration",
      description: "A channel run by a registered migration agency offering detailed guidance on visa processes.",
      link: "https://www.youtube.com/c/TheMigration"
    },
    {
      name: "Life with Chioma",
      description: "Personal experiences and practical advice about moving to and living in Australia as an immigrant.",
      link: "https://www.youtube.com/c/LifewithChioma"
    }
  ];

  const keyOccupations: OccupationItem[] = [
    { anzsco: "133111", title: "Construction Project Manager", list: "MLTSSL", assessingAuthority: "VETASSESS" },
    { anzsco: "233211", title: "Civil Engineer", list: "MLTSSL", assessingAuthority: "Engineers Australia" },
    { anzsco: "233311", title: "Electrical Engineer", list: "MLTSSL", assessingAuthority: "Engineers Australia" },
    { anzsco: "233512", title: "Mechanical Engineer", list: "MLTSSL", assessingAuthority: "Engineers Australia" },
    { anzsco: "234111", title: "Agricultural Consultant", list: "MLTSSL", assessingAuthority: "VETASSESS" },
    { anzsco: "241111", title: "Early Childhood Teacher", list: "MLTSSL", assessingAuthority: "AITSL" },
    { anzsco: "251211", title: "Medical Diagnostic Radiographer", list: "MLTSSL", assessingAuthority: "ASMIRT" },
    { anzsco: "251212", title: "Medical Radiation Therapist", list: "MLTSSL", assessingAuthority: "ASMIRT" },
    { anzsco: "251213", title: "Nuclear Medicine Technologist", list: "MLTSSL", assessingAuthority: "ANZSNM" },
    { anzsco: "251214", title: "Sonographer", list: "MLTSSL", assessingAuthority: "ASAR" },
    { anzsco: "251311", title: "Environmental Health Officer", list: "MLTSSL", assessingAuthority: "VETASSESS" },
    { anzsco: "251312", title: "Occupational Health and Safety Advisor", list: "MLTSSL", assessingAuthority: "VETASSESS" },
    { anzsco: "251411", title: "Optometrist", list: "MLTSSL", assessingAuthority: "OCANZ" },
    { anzsco: "252411", title: "Occupational Therapist", list: "MLTSSL", assessingAuthority: "OTC" },
    { anzsco: "252511", title: "Physiotherapist", list: "MLTSSL", assessingAuthority: "APC" },
    { anzsco: "252611", title: "Podiatrist", list: "MLTSSL", assessingAuthority: "ANZPAC" },
    { anzsco: "252711", title: "Audiologist", list: "MLTSSL", assessingAuthority: "VETASSESS" },
    { anzsco: "252712", title: "Speech Pathologist", list: "MLTSSL", assessingAuthority: "SPA" },
    { anzsco: "261111", title: "ICT Business Analyst", list: "MLTSSL", assessingAuthority: "ACS" },
    { anzsco: "261112", title: "Systems Analyst", list: "MLTSSL", assessingAuthority: "ACS" },
    { anzsco: "261311", title: "Analyst Programmer", list: "MLTSSL", assessingAuthority: "ACS" },
    { anzsco: "261312", title: "Developer Programmer", list: "MLTSSL", assessingAuthority: "ACS" },
    { anzsco: "261313", title: "Software Engineer", list: "MLTSSL", assessingAuthority: "ACS" },
    { anzsco: "263111", title: "Computer Network and Systems Engineer", list: "MLTSSL", assessingAuthority: "ACS" },
    { anzsco: "272311", title: "Clinical Psychologist", list: "MLTSSL", assessingAuthority: "APS" },
    { anzsco: "272399", title: "Psychologist (nec)", list: "MLTSSL", assessingAuthority: "APS" },
    { anzsco: "272511", title: "Social Worker", list: "MLTSSL", assessingAuthority: "AASW" },
    { anzsco: "321111", title: "Automotive Electrician", list: "MLTSSL", assessingAuthority: "TRA" },
    { anzsco: "321211", title: "Motor Mechanic (General)", list: "MLTSSL", assessingAuthority: "TRA" },
    { anzsco: "321212", title: "Diesel Motor Mechanic", list: "MLTSSL", assessingAuthority: "TRA" },
    { anzsco: "331111", title: "Bricklayer", list: "MLTSSL", assessingAuthority: "TRA" },
    { anzsco: "331211", title: "Carpenter and Joiner", list: "MLTSSL", assessingAuthority: "TRA" },
    { anzsco: "331212", title: "Carpenter", list: "MLTSSL", assessingAuthority: "TRA" },
    { anzsco: "331213", title: "Joiner", list: "MLTSSL", assessingAuthority: "TRA" },
    { anzsco: "333211", title: "Fibrous Plasterer", list: "MLTSSL", assessingAuthority: "TRA" },
    { anzsco: "333212", title: "Solid Plasterer", list: "MLTSSL", assessingAuthority: "TRA" },
    { anzsco: "334111", title: "Plumber (General)", list: "MLTSSL", assessingAuthority: "TRA" },
    { anzsco: "334112", title: "Airconditioning and Mechanical Services Plumber", list: "MLTSSL", assessingAuthority: "TRA" },
    { anzsco: "334113", title: "Drainer", list: "MLTSSL", assessingAuthority: "TRA" },
    { anzsco: "334114", title: "Gasfitter", list: "MLTSSL", assessingAuthority: "TRA" },
    { anzsco: "334115", title: "Roof Plumber", list: "MLTSSL", assessingAuthority: "TRA" },
  ];

  const renderResourceList = (resources: ResourceItem[]) => (
    <List>
      {resources.map((resource, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemIcon>
              {resource.icon}
            </ListItemIcon>
            <ListItemText 
              primary={resource.title} 
              secondary={
                <>
                  {resource.description}
                  <br />
                  <Link 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    color="primary"
                  >
                    Visit Website
                  </Link>
                </>
              } 
            />
          </ListItem>
          {index < resources.length - 1 && <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
    </List>
  );

  const renderServiceProviders = (category: string) => {
    const filteredProviders = serviceProviders.filter(provider => provider.category === category);
    
    return (
      <Box>
        {filteredProviders.map((provider, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography fontWeight="bold">{provider.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    <strong>Website:</strong>{' '}
                    <Link 
                      href={`https://${provider.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {provider.website}
                    </Link>
                  </Typography>
                </Grid>
                {provider.phone && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Phone:</strong> {provider.phone}
                    </Typography>
                  </Grid>
                )}
                {provider.email && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Email:</strong>{' '}
                      <Link href={`mailto:${provider.email}`}>
                        {provider.email}
                      </Link>
                    </Typography>
                  </Grid>
                )}
                {provider.address && (
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Address:</strong> {provider.address}
                    </Typography>
                  </Grid>
                )}
                {provider.notes && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Note:</strong> {provider.notes}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Resources
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
          Helpful resources for your Australian immigration journey
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Official Resources
                </Typography>
                {renderResourceList(officialResources)}
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  href="https://immi.homeaffairs.gov.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More Official Resources
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Living in Australia
                </Typography>
                {renderResourceList(livingInAustraliaResources)}
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  href="https://www.australia.gov.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Australian Government Services
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Community & Forums
                </Typography>
                {renderResourceList(communityResources)}
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  href="https://www.facebook.com/groups/britishexpatsaustralia/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook Communities
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Service Providers
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
            Professional services to help with your migration journey
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BusinessIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h5" component="h3">
                      Migration Agents
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Professional migration agents can help with visa applications, advice, and representation.
                  </Typography>
                  {renderServiceProviders('migration')}
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AssessmentIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h5" component="h3">
                      Skills Assessment Organizations
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    These organizations assess your qualifications and skills for Australian immigration.
                  </Typography>
                  {renderServiceProviders('skills')}
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocalShippingIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h5" component="h3">
                      International Removals & Shipping
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Companies that can help you move your belongings to Australia.
                  </Typography>
                  {renderServiceProviders('shipping')}
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h5" component="h3">
                      Financial Services
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Mortgage advisors and financial services to help with your move to Australia.
                  </Typography>
                  {renderServiceProviders('finance')}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Pet Relocation Resources
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
            Help with relocating your pets to Australia
          </Typography>
          
          <Card elevation={3} sx={{ mb: 6 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PetsIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h5" component="h3">
                  Pet Travel & Quarantine Information
                </Typography>
              </Box>
              {renderResourceList(petRelocationResources)}
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Note: Australia has strict biosecurity laws for pet imports. All pets must meet specific requirements and may need to undergo quarantine.
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Facebook Groups
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
            Connect with UK expats and get firsthand advice through these active Facebook communities
          </Typography>
          
          <Grid container spacing={3}>
            {facebookGroups.map((group, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <FacebookIcon />
                      </Avatar>
                      <Typography variant="h6" component="h3">
                        {group.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {group.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      href={group.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<FacebookIcon />}
                      fullWidth
                      variant="outlined"
                    >
                      Join Group
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            YouTube Channels
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
            Video resources to help with your Australian immigration journey
          </Typography>
          
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <YouTubeIcon color="error" sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h5" component="h3">
                  Recommended YouTube Channels
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                {youtubeChannels.map((channel, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" component="h4" gutterBottom>
                          {channel.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {channel.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button 
                          startIcon={<YouTubeIcon />}
                          size="small" 
                          color="error"
                          href={channel.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Watch on YouTube
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Skilled Occupation Lists
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
            Key occupations eligible for skilled migration to Australia
          </Typography>
          
          <Card elevation={3} sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About the Skilled Occupation Lists
              </Typography>
              <Typography variant="body2" paragraph>
                Australia uses several occupation lists to determine eligibility for different skilled visa types:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Medium and Long-term Strategic Skills List (MLTSSL)" 
                    secondary="Occupations on this list are eligible for Skilled Independent (subclass 189), Skilled Work Regional (subclass 491), and Skilled Nominated (subclass 190) visas. These are generally occupations with long-term demand in Australia."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Short-term Skilled Occupation List (STSOL)" 
                    secondary="Occupations on this list are eligible for Skilled Nominated (subclass 190) and Skilled Work Regional (subclass 491) visas, but not for Skilled Independent (subclass 189) visas."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Regional Occupation List (ROL)" 
                    secondary="Occupations on this list are only eligible for Skilled Work Regional (subclass 491) visas in designated regional areas."
                  />
                </ListItem>
              </List>
              
              <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                Each occupation has an ANZSCO (Australian and New Zealand Standard Classification of Occupations) code and a designated assessing authority that evaluates your skills and qualifications.
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Key Occupations in Demand
              </Typography>
              
              <TableContainer component={MuiPaper} sx={{ mt: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>ANZSCO</strong></TableCell>
                      <TableCell><strong>Occupation</strong></TableCell>
                      <TableCell><strong>List</strong></TableCell>
                      <TableCell><strong>Assessing Authority</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {keyOccupations.map((occupation) => (
                      <TableRow key={occupation.anzsco}>
                        <TableCell>{occupation.anzsco}</TableCell>
                        <TableCell>{occupation.title}</TableCell>
                        <TableCell>{occupation.list}</TableCell>
                        <TableCell>{occupation.assessingAuthority}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Note: Occupation lists are subject to change. Always check the latest lists on the 
                  <Link 
                    href="https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupation-list" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ ml: 1 }}
                  >
                    Department of Home Affairs website
                  </Link>.
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                color="primary"
                href="https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupation-list"
                target="_blank"
                rel="noopener noreferrer"
              >
                Official Skilled Occupation Lists
              </Button>
            </CardActions>
          </Card>
        </Box>
        
        <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            <strong>Disclaimer:</strong> The service providers, YouTube channels, and resources listed here are for informational purposes only. 
            We do not endorse any specific provider or service. Always conduct your own research and due diligence before 
            engaging any service.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Resources; 