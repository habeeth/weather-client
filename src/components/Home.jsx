import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWeatherByLocation } from "../actions";
import TableCell from "@mui/material/TableCell";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Home = (props) => {
  const [location, setLocation] = useState("Salem");
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(getWeatherByLocation(location));
  }, []);

  const changeLocation = (e) => {
    e.preventDefault();
    dispatch(getWeatherByLocation(location));
  };

  if (weather && weather.loading) {
    return <>Loading...</>;
  }
  if (weather && weather.error && weather.error !== null) {
    return <>API Error Occured...</>;
  }
  return (
    <>
      <Container component="main" maxWidth="md">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Weather App
          </Typography>
        </Paper>

        <form onSubmit={changeLocation}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}
          >
            <Grid container spacing={2} align="center">
              <Grid item xs={12} sm={9}>
                <TextField
                  name="location"
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 3 }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>

        {weather && weather.data ? (
          <div>
            <Card sx={{ minWidth: 275 }} align="center">
              <CardHeader
                title={weather.data.name}
                subheader={`${weather.data.region}, ${weather.data.country}`}
              />
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                ></Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Air Quality:{weather.data.airQuality}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Chances of Rain:{weather.data.chancesOfRain}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Sunrise:{weather.data.sunrise}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Sunset:{weather.data.sunset}
                </Typography>
              </CardContent>
            </Card>
            <br/>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="center">Temperature</TableCell>
                    <TableCell align="center">Wind Speed</TableCell>
                    <TableCell align="center">Safe to Roam?</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {weather.data.weatherDetails.map((value) => (
                    <TableRow
                      key={value.date}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {value.date}
                      </TableCell>
                      <TableCell align="center">{value.temperature}</TableCell>
                      <TableCell align="center">{value.windSpeed}</TableCell>
                      <TableCell align="center">
                        {value.temperature > 10 && value.temperature < 35
                          ? "Yes"
                          : "No"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          "failed during rendering"
        )}
      </Container>
    </>
  );
};

export default Home;
