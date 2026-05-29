import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { viewVideo } from '../store/slices/videosSlice'
import StoryWrapper from '../components/common/StoryWrapper'
import NecoStory from '../stories/Neco_Part1_TheWeekend'
import NecoPart2 from '../stories/Neco_Part2_NineLives'
import NecoPart3 from '../stories/Neco_Part3_LittleTaste'
import NecoPart4 from '../stories/Neco_Part4_ANewBox'
import NecoSPParte1 from '../stories/Neco_SP_Parte1_ElFinDeSemana'
import NecoSPParte2 from '../stories/Neco_SP_Parte2_NueveVidas'
import NecoSPParte3 from '../stories/Neco_SP_Parte3_Sabroseada'
import NecoSPParte4 from '../stories/Neco_SP_Parte4_CambioDeCaja'

const STORIES = {
  '17': NecoStory,
  '18': NecoPart2,
  '19': NecoPart3,
  '20': NecoPart4,
  '21': NecoSPParte1,
  '22': NecoSPParte2,
  '23': NecoSPParte3,
  '24': NecoSPParte4,
}

export default function StoryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const StoryComponent = STORIES[id]

  useEffect(() => {
    dispatch(viewVideo(id))
    window.scrollTo(0, 0)
  }, [id, dispatch])

  if (!StoryComponent) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <p>Story not found.</p>
        <Button onClick={() => navigate(-1)}>Go back</Button>
      </Box>
    )
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ position: 'fixed', top: 72, left: 16, zIndex: 200, bgcolor: 'background.paper', boxShadow: 1 }}
        size="small"
      >
        Back
      </Button>
      <StoryWrapper>
        <StoryComponent />
      </StoryWrapper>
    </Box>
  )
}
