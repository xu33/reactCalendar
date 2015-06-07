var styles = {
	daysContainer: {
		overflow:'hidden',
		width: 350,
		height: 300
	},
	title : {
		padding: '5px',
		position: 'relative'
	},
	cell: {
		float: 'left',
		width: 50,
		height: 50,
		lineHeight: '50px',
		textAlign: 'center',
		color: '#000',
		cursor: 'pointer'
	},
	nextLink: {
		position: 'absolute',
		right: 10
	},
	prevLink: {
		position: 'absolute',
		left: 10
	},
	clickAble: {
		cursor: 'pointer'
	},
	currentMonth: {
		margin: '0 20px',
		textAlign: 'center'
	},
	wrapper: {
		border: '1px solid #555'
	}
}

function isLeapYear(iYear) {
 if (iYear % 4 == 0 && iYear % 100 != 0) {
  return true;
 } else {
  if (iYear % 400 == 0) {
   return true;
  } else {
   return false;
  }
 }
}

function zeller(y, m, d) {
	var floor = Math.floor

	if (m === 1 || m === 2) {
		m = 12 + m
		y = y - 1
	}

	var k = y % 100
	var j = Math.ceil( y / 100 )

	var h = d + floor(13/5*(m+1)) + k + floor(k/4) + floor(j/4) + 5 * j
	return h % 7
}

function getMonths(year) {
	return [31, isLeapYear(year) ? 29: 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
}

function formatDatetime(year, month, day) {
	if (month < 10) {
		month = '0' + month
	} 

	if (day < 10) {
		day = '0' + day
	}

	return [year, month, day].join('-')
}

var calendar = React.createClass({
	getDefaultProps: function() {
		var today = new Date()

		return {
			selectedDay: '',
			year: today.getFullYear(),
			month: today.getMonth() + 1,
			day: today.getDate(),
			weekDays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		}
	},
	getInitialState: function() {
		return {
			visableStatus: 'none'
		}
	},
	render: function() {
		var self = this
		var totalDays = getMonths(this.props.year)[this.props.month - 1]
		var daysOfMonth = []

		for (var i = 1; i <= totalDays; i++) {
			daysOfMonth.push(
				<div key={i} onClick={this.selectDay.bind(this, i)} style={styles.cell}>{i}</div>
			)
		}

		var weekDaysNodes = this.props.weekDays.map(function(item, index) {
			return <div style={styles.cell} key={'week' + index}>{item}</div>
		})

		var firstDayOfMonthIsWhichWeekDay = zeller(this.props.year, this.props.month, 1)
		var emptyBlocks = []

		for (var i = 0; i < firstDayOfMonthIsWhichWeekDay; i++) {
			emptyBlocks.push(<div style={styles.cell} key={'placeholder'+i}></div>)
		}

		var inputValue = formatDatetime(this.props.year, this.props.month, this.props.day)

		return (
			<div>
				<input type="text" onFocus={this.showPicker} onBlur={this.hidePicker} value={inputValue} />
				<div style={{width:350, display:this.state.visableStatus, border: '1px solid #555'}} ref="picker">
					<div style={styles.title}>
						<div style={styles.prevLink}><a href="javascript:;" onClick={this.showPrevMonth}>prev</a></div>
						<div style={styles.nextLink}><a href="javascript:;" onClick={this.showNextMonth}>next</a></div>
						<div style={styles.currentMonth}>{this.props.year} - {this.props.month}</div>
					</div>
					<div style={{overflow: 'hidden'}}>{weekDaysNodes}</div>
					<div style={styles.daysContainer}>
					{emptyBlocks}
					{daysOfMonth}
					</div>
				</div>
			</div>
		)
	},
	showPicker: function() {
		this.setState({
			visableStatus: 'block'
		})
	},
	hidePicker: function() {
		
	},
	selectDay: function(day) {
		this.setProps({
			day: day
		})

		this.setState({
			visableStatus: 'none'
		})
	},
	showNextMonth: function() {
		var month = this.props.month + 1
		var year = this.props.year
		if (month > 12) {
			month = 1
			year = year + 1
		}

		this.setProps({
			year: year,
			month: month
		})
	},
	showPrevMonth: function() {
		var month = this.props.month - 1
		var year = this.props.year
		if (month <= 0) {
			month = 12
			year = year - 1
		}

		this.setProps({
			year: year,
			month: month
		})
	}
})