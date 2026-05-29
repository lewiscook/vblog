import React from 'react'
import { Box, Chip, Skeleton } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { setSelected } from '../../store/slices/categoriesSlice'

const VISIBLE_SLUGS = ['novel', 'chapters', 'capitulos']

export default function CategoryFilter({ onChange }) {
  const dispatch = useDispatch()
  const { items, selected, loading } = useSelector(s => s.categories)

  const handleSelect = (slug) => {
    dispatch(setSelected(slug))
    if (onChange) onChange(slug)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} variant="rounded" width={80} height={32} />)}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex', gap: 1, overflowX: 'auto', pb: 1,
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
      }}
    >
      <Chip
        label="All"
        clickable
        color={selected === 'all' ? 'primary' : 'default'}
        variant={selected === 'all' ? 'filled' : 'outlined'}
        onClick={() => handleSelect('all')}
        sx={{ fontWeight: 600, flexShrink: 0 }}
      />
      {items.filter(cat => VISIBLE_SLUGS.includes(cat.slug)).map(cat => (
        <Chip
          key={cat.id}
          label={cat.name}
          clickable
          variant={selected === cat.slug ? 'filled' : 'outlined'}
          onClick={() => handleSelect(cat.slug)}
          sx={{
            flexShrink: 0,
            fontWeight: 500,
            ...(selected === cat.slug && {
              background: cat.color,
              color: '#fff',
              borderColor: cat.color,
            }),
            ...(selected !== cat.slug && {
              borderColor: cat.color + '66',
              color: cat.color,
            }),
          }}
        />
      ))}
    </Box>
  )
}
