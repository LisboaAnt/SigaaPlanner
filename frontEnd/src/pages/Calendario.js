import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
const events = [{ start: new Date(), end: new Date(), title: "special event" }];
const DnDCalendar = withDragAndDrop(Calendar);

function Calendario(props){
  const userId = props.userId; // Acessa o valor de userId corretamente


}

class App extends React.Component {
  state = {
    events
  };

onEventResize = (data) => {
    const { start, end } = data;
    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };
  onEventDrop = (data) => {
    console.log(data);
  };
  render() {
    return (
      <div className="App">
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={this.state.events}
          localizer={localizer}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: "94.5vh",backgroundColor: '#F4F9F8', border: '1px'}}
        />
      </div>
    );
  }
}


export default App;