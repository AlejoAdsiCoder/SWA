import { Card, CardActions, CardContent, CardHeader, Container, Grid, IconButton, Pagination, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DataService from '../../services/DataService'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ListModal } from './ListModal';

export const List = () => {
  
  const [people, setPeople] = useState([]);
  const [currentIndex, setcurrentIndex] = useState(1);

  // Estados para manejo de la paginación
  const [page, setPage] = useState(1); // Pagina Actual
  const [count, setCount] = useState(0); // Total de paginas
  const [open, setOpen] = useState(false); // Estado del Modal
  const [modaldata, setModalData] = useState({}); // Enviando datos al modal
  // const [filterGender, setfilterGender] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // Resultados del filtro
  const [filterName, setFilterName] =  useState(""); // Filtro del nombre

  //
  const api = async (params) => {
    DataService.getAll(params)
    .then((response) => {
      const { results } = response.data
      setPeople(results)
      setCount(results.length)
      console.log(people)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const filteredNames = (people) => people.filter(e => e.name.toLowerCase().includes(filterName.toLowerCase()));

  useEffect(() => {

    const params = getRequestParams(page);

    console.log(params)

    api(params)

    let result = people;
        result = filteredNames(result)

        setSearchResults(result)

  }, [page, filteredNames])
  

  function getRequestParams(page, pageSize) {
    let params = {};

    if (page) {
      params["page"] = page;
    }

    // if (pageSize) {
    //   params["size"] = pageSize;
    // }

    return params;
  }

  function handlePageChange(event, value) {
    console.log(value)
    setPage(value);
  }

  const handleOpen = (data) => {
    setOpen(!open);
    setModalData(data)
  };

  const getFiltersName = e => {
    console.log(e.target.value)
    setFilterName(e.target.value);
  }

  return (
    <div>
      <Container>
      <h1>Characters</h1>
        Nombre:
        <input 
          id="name"
          type="text"
          value={filterName} 
          onChange={getFiltersName}
        />
        {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Male</MenuItem>
          <MenuItem value={20}>Female</MenuItem>
        </Select> */}
      <Stack spacing={2}>
      <Pagination
        className='my-3'
        count={count}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
      />
      </Stack>
      <Grid container mt={2} spacing={3}>
        {
          searchResults.map(person => {
            return (
              <Grid item key={person.name} xs={12} md={6} lg={4}>
                 <Card>
                  <CardContent>
                    <Typography variant="h5">
                    { person.name }
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                    Altura: { person.height }
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                    Masa: { person.mass }
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                    Genero: { person.gender }
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <IconButton onClick={() => handleOpen(person)}><VisibilityIcon /></IconButton>
                    
                  </CardActions>
                  <ListModal
                      isDialogOpened={open}
                      handleCloseDialog={() => setOpen(false)}
                      info={modaldata}
                    />
                 </Card>
                 
              </Grid>
            )
          })
        }
      </Grid>
      </Container>
    </div>
  )
}



