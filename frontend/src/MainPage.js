import React from "react";
import { AppBar, Toolbar, Typography, Container, Box, Card, CardContent, Avatar } from "@mui/material";
import { Instagram } from "@mui/icons-material";
import { Grid, CardMedia, Button, styled } from "@mui/material";
import { format } from "date-fns";
import ruLocale from "date-fns/locale/ru";

// Пример данных новостей
const newsData = [
  {
    id: 1,
    title: "Открытие нового корпуса",
    description: "В нашем колледже открылся новый корпус для занятий по IT.",
    image: "/images/news1.jpg",
    date: new Date(),
  },
  {
    id: 2,
    title: "Конференция по искусственному интеллекту",
    description: "Прошла успешная конференция по развитию AI-технологий.",
    image: "/images/news2.jpg",
    date: new Date(),
  },
  {
    id: 3,
    title: "День открытых дверей",
    description: "Приглашаем всех абитуриентов на день открытых дверей.",
    image: "/images/news3.jpg",
    date: new Date(),
  },

];

// Стили для карточек с добавлением более выразительных эффектов
const StyledCard = styled(Card)(({ theme }) => ({
  width: "200px",
  height: '100%',
  transition: 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[8],
    cursor: 'pointer',
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width:"100%",
  height: 120,
  transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
  '&:hover': {
    opacity: 0.9,
    transform: 'scale(1.02)',
  },
}));

const GradientOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '100%',
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
  color: theme.palette.common.white,
  '&:hover': {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    transform: 'scale(1.03)',
  },
}));

// MainPage Component
function MainPage() {
  return (
   
   
    <div style={{  backgroundColor: '#F0FFFF' ,minHeight: '100vh', border: "2px solid ",}}>
       <Box>
      <AppBar position="static" style={{ 
        backgroundColor: '#FFFFFF',
        marginTop:84, 
        height:150,
        border: '5px solid #FF0000',
        borderRadius: 40 }}>


        <Toolbar style={{ display: 'flex', justifyContent: 'center', marginTop : 45 }}>
          <Typography variant="h5" gutterBottom style={{ color:"#000000" }}>
            СТОП БУЛЛИНГ!
          </Typography>
        </Toolbar>
      </AppBar>
      </Box>

      
      
      {/* Контейнер с контентом, отступ сверху только для контента */}
      <Container maxWidth="lg" style={{ marginTop: '100px', }}> {/* Отступ только для контента */}
        <Box display="flex" flexWrap="wrap" gap={4} >
          {/* Left Column (News Section) */}
          <Box flex={1} minWidth="300px" >
            <Typography variant="h5" gutterBottom style={{ color: '#FFFAFA' , marginLeft:-210, }}>
              Новости <Instagram style={{ verticalAlign: 'middle' }} />
            </Typography>
            

            <Grid container spacing={14} marginLeft={-40}>{/* Манипуляция местом распложения фотокарточек*/}
              {newsData.map((newsItem) => (
                <Grid item key={newsItem.id} xs={12} sm={6} md={4} >
                  <StyledCard>
                    <Box sx={{ position: 'relative' }}>
                      <StyledCardMedia component="img" image={newsItem.image} alt={newsItem.title} />
                      <GradientOverlay />
                    </Box>
                    <CardContent>
                      <Typography variant="h6" component="div" gutterBottom>
                        {newsItem.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {newsItem.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
                        {format(newsItem.date, "d MMMM yyyy", { locale: ruLocale })}
                      </Typography>
                      <StyledButton variant="contained">
                        Читать далее
                      </StyledButton>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Right Column (Administration Section) */}
          <Box flex={1} minWidth="300px" marginTop={-1} marginRight={-30}>
            <Typography variant="h5" gutterBottom style={{ color: '#FFFAFA' }}>
              Администрация
            </Typography>
            <Box display="flex" flexDirection="column" gap={4} >
              <Box >
                <Card >
                  <CardContent>
                    <Typography variant="h6" style={{ color: '#4da8da' }}>Director</Typography>
                    <Avatar src="/2e1e7971-a2c5-45a3-8481-5405349520d5.jpg" alt="Director" sx={{ width: 100, height: 100, margin: '20px auto' }} />
                    <Typography variant="body2">Name: John Doe</Typography>
                    <Typography variant="body2">Email: john.doe@example.com</Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box>
                <Card>
                  <CardContent>
                    <Typography variant="h6" style={{ color: '#4da8da' }}>President</Typography>
                    <Avatar src="/certain-doesnt-mean-right-scaled.jpg" alt="President" sx={{ width: 100, height: 100, margin: '20px auto' }} />
                    <Typography variant="body2">Name: Jane Smith</Typography>
                    <Typography variant="body2">Email: jane.smith@example.com</Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
   

  );
}

export default MainPage;
