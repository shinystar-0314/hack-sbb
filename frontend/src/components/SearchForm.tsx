import React, { useState, SyntheticEvent } from 'react'
import { Dropdown, Button, Checkbox } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import { Origin } from '../models/Origin'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCity,
  faHiking,
  faHome,
  faMountain,
} from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import 'react-datepicker/dist/react-datepicker.css'
import './SearchForm.css'
import { Activity } from '../models/Activity'

export const formatDate = (date: Date): string => {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

const MOCK_ORIGINS: Origin[] = [
  { id: 8503000, name: 'Zurich' },
  { id: 8507000, name: 'Bern' },
  { id: 8500010, name: 'Basel' },
  { id: 8501120, name: 'Lausanne' },
  { id: 8506000, name: 'Winterthur' },
  { id: 8505000, name: 'Lucerne' },
  { id: 8501008, name: 'Geneva' },
  { id: 8506302, name: 'St. Gallen' },
  { id: 8504300, name: 'Biel' },
  { id: 8502204, name: 'Zug' },
  { id: 8503504, name: 'Baden' },
  { id: 8507100, name: 'Thun' },
  { id: 8504221, name: 'Neuchâtel' },
  { id: 8509000, name: 'Chur' },
  { id: 8503125, name: 'Uster' },
  { id: 8503110, name: 'Rapperswil' },
  { id: 8504100, name: 'Fribourg' },
]

const MOCK_ACTIVITIES: Activity[] = [
  { id: 1, name: 'hiking', text: 'Hiking', icon: faHiking },
  { id: 2, name: 'sightseeing', text: 'Sightseeing', icon: faCity },
  { id: 3, name: 'shopping', text: 'Shopping', icon: null },
  { id: 4, name: 'playing', text: 'Family friendly', icon: null },
  { id: 5, name: 'eating', text: 'Eating', icon: null },
]

const initialState = {
  origins: MOCK_ORIGINS,
  date: new Date(new Date().setDate(new Date().getDate() + 1)),
  activities: MOCK_ACTIVITIES,
  maxPrice: 50,
  halfFare: true,
}

interface Props {
  searchTrips: (
    originId: number,
    travelDate: string,
    maxPrice: number,
    withHalfFare: boolean,
    categories: string[],
  ) => void
  loading: boolean
  selectedDate: Date
  setSelectedDate: Function
}

export const SearchForm: React.FC<Props> = ({
  loading,
  searchTrips,
  selectedDate,
  setSelectedDate,
}) => {
  const [selectedOrigin, setSelectedOrigin] = useState<number>()
  const [selectedActivities, setSelectedActivities] = useState([])
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(
    initialState.maxPrice,
  )
  const [selectedHalfFare, setSelectedHalfFare] = useState(
    initialState.halfFare,
  )
  const [error, setError] = useState<string>('')

  const originOptions: {
    text: string
    value: string
  }[] = initialState.origins.map(origin => {
    return { text: origin.name, value: origin.id.toString() }
  })

  const activityOptions: {
    text: string
    value: string
  }[] = initialState.activities.map(activity => {
    return { text: activity.text, value: activity.id.toString() }
  })

  const onOriginChange = (event: SyntheticEvent, data: any) => {
    setSelectedOrigin(data.value)
  }

  const onDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const onActivityChange = (event: SyntheticEvent, data: any) => {
    setSelectedActivities(
      data.value.map((id: number) => {
        const activity = initialState.activities.find(
          activity => activity.id == id,
        )
        return activity ? activity.name : ''
      }),
    )
  }

  const onMaxPriceChange = (value: number) => {
    setSelectedMaxPrice(value)
  }

  const onHalfFareChange = (event: SyntheticEvent, data: any) => {
    setSelectedHalfFare(data.checked)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()

    if (!selectedOrigin) {
      setError('Please choose the starting point of your trip.')
      return
    }

    if (selectedActivities.length === 0) {
      setError('Please choose at least one activity.')
      return
    }

    searchTrips(
      selectedOrigin || 0,
      formatDate(selectedDate),
      selectedMaxPrice,
      selectedHalfFare,
      selectedActivities,
    )
  }

  const priceSliderMarks = {
    0: '0.-',
    10: '10.-',
    20: '20.-',
    30: '30.-',
    40: '40.-',
    50: '50.-',
    60: '60.-',
    70: '70.-',
    80: '80.-',
    90: '90.-',
    100: '100.-',
  }

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="lineWrapper">
          <div className="label">
            <FontAwesomeIcon icon={faHome} />
          </div>
          <Dropdown
            placeholder="Where does your trip start?"
            fluid
            selection
            search
            options={originOptions}
            onChange={onOriginChange}
          />
        </div>

        <div className="break"></div>

        <div className="lineWrapper">
          <div className="label">
            <FontAwesomeIcon icon={faMountain} />
          </div>
          <Dropdown
            placeholder="Select your desired activities"
            fluid
            multiple
            selection
            options={activityOptions}
            onChange={onActivityChange}
          />
        </div>

        <div className="break"></div>

        <div className="lineWrapper">
          <div className="label small">
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
          <DatePicker
            selected={selectedDate}
            onChange={onDateChange}
            minDate={initialState.date}
            className="ui input"
          />
        </div>

        <div className="break"></div>

        <div style={{ margin: '1rem' }}>
          <p style={{ textAlign: 'center' }}>Max. Price</p>
          <Slider
            min={0}
            marks={priceSliderMarks}
            step={10}
            onChange={onMaxPriceChange}
            defaultValue={selectedMaxPrice}
          />
        </div>

        <div className="big-break"></div>

        <div style={{ textAlign: 'center' }}>
          <Checkbox
            toggle
            label="Half Fare"
            checked={selectedHalfFare}
            onChange={onHalfFareChange}
          />
        </div>

        <div className="med-break"></div>

        <Button disabled={loading} type="submit" style={{ width: '100%' }}>
          Search
        </Button>
      </form>
    </div>
  )
}
