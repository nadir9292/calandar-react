import React from "react"
import moment from "moment"
export default class Calendar extends React.Component {
  weekdayshort = moment.weekdaysShort()

  state = {
    showYearTable: false,
    showMonthTable: false,
    showDateTable: true,
    dateObject: moment(),
    allmonths: moment.months(),
    selectedDay: null,
  }
  daysInMonth = () => {
    return this.state.dateObject.daysInMonth()
  }
  year = () => {
    return this.state.dateObject.format("Y")
  }
  currentDay = () => {
    return this.state.dateObject.format("D")
  }
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject
    let firstDay = moment(dateObject).startOf("month").format("d") // Day of week 0...1..5...6
    return firstDay
  }
  month = () => {
    return this.state.dateObject.format("MMMM")
  }
  onPrev = () => {
    let curr = ""
    if (this.state.showYearTable === true) {
      curr = "year"
    } else {
      curr = "month"
    }
    this.setState({
      dateObject: this.state.dateObject.subtract(1, curr),
    })
  }
  onNext = () => {
    let curr = ""
    if (this.state.showYearTable === true) {
      curr = "year"
    } else {
      curr = "month"
    }
    this.setState({
      dateObject: this.state.dateObject.add(1, curr),
    })
  }

  render() {
    let weekdayshortname = this.weekdayshort.map((day) => {
      return <th key={day}>{day}</th>
    })
    let blanks = []
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty">{""}</td>)
    }
    let daysInMonth = []
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d === this.currentDay() ? "today" : ""
      daysInMonth.push(
        <td key={d} className={`calendar-day ${currentDay}`}>
          <span
            onClick={(e) => {
              this.onDayClick(e, d)
            }}
          >
            {d}
          </span>
        </td>
      )
    }
    var totalSlots = [...blanks, ...daysInMonth]
    let rows = []
    let cells = []

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row)
      } else {
        rows.push(cells)
        cells = []
        cells.push(row)
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells)
      }
    })

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>
    })

    return (
      <div className="w-72 h-full bg-red-100 border-solid border-4 border-gray-700 rounded-md">
        <div className="p-2 bg-red-400 font-bold flex justify-between">
          <span
            onClick={(e) => {
              this.onPrev()
            }}
          >
            ◀️
          </span>
          {!this.state.showMonthTable && (
            <span className="py-1 px-3 rounded mx-2">{this.month()}</span>
          )}
          <span className="py-1 px-3 rounded mx-2">{this.year()}</span>
          <span
            onClick={(e) => {
              this.onNext()
            }}
          >
            ▶️
          </span>
        </div>

        {this.state.showDateTable && (
          <table className="w-full h-full">
            <thead>
              <tr className="font-bold">{weekdayshortname}</tr>
            </thead>
            <tbody>{daysinmonth}</tbody>
          </table>
        )}
      </div>
    )
  }
}
