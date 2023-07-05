// Write your code here

import {Component} from 'react'

import './index.css'

/*
 */

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  check = () => {
    const {isTimerRunning} = this.state
    console.log(isTimerRunning)
  }

  onDecrease = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncrease = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onRunningTime = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {
      timerLimitInMinutes,
      timeElapsedInSeconds,
      isTimerRunning,
    } = this.state

    const setRunningWord = isTimerRunning ? 'Pause' : 'Start'
    const timeStatus = isTimerRunning ? 'Running' : 'Paused'
    const img = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const imgAlt = isTimerRunning ? 'pause icon' : 'play icon'
    const classname = isTimerRunning ? 'button-img1' : 'button-img'

    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>

        <div className="time-container">
          <div className="Running-time">
            <div className="running-container">
              <h1 className="time">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="time-pera">{timeStatus}</p>
            </div>
          </div>
          <div className="button-container">
            <div className="button-set">
              <button
                type="button"
                className="button"
                onClick={this.onRunningTime}
              >
                <img src={img} className={classname} alt={imgAlt} />
                <p className="start">{setRunningWord}</p>
              </button>

              <button
                type="button"
                className="button"
                onClick={this.onResetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  className="button-img"
                  alt="reset icon"
                />
                <p className="start">Reset</p>
              </button>
            </div>

            <p className="pera">Set Timer limit</p>
            <div className="timmer-container">
              <button
                className="buttons"
                disabled={isButtonsDisabled}
                type="button"
                onClick={this.onDecrease}
              >
                -
              </button>
              <p className="count">{timerLimitInMinutes}</p>
              <button
                className="buttons"
                type="button"
                onClick={this.onIncrease}
                disabled={isButtonsDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
