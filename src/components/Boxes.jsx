import { LocateFixed, Clock, Coffee, ChartNoAxesCombined } from "lucide-react";

const Boxes = ({ stats }) => {
  return (
    <div className="box-container">
      <div className="item focus">
        <div className="box-item-img">
          <LocateFixed size={20} color="#5252E0" strokeWidth={2} />
        </div>

        <div className="item-info">
          <p>Focus sessions</p>
          <h5>{stats.sessions} </h5>
        </div>
      </div>

      <div className="item focustime">
        <div className="box-item-img">
          <Clock size={20} color="#5252E0" strokeWidth={2} />
        </div>

        <div className="item-info">
          <p>Focus time</p>
          <h5>{stats.focus}m </h5>
        </div>
      </div>

      <div className="item focus">
        <div className="box-item-img box-item-img-cofee ">
          <Coffee size={20} className="coffee" strokeWidth={2} />
        </div>

        <div className="item-info">
          <p>Breaks taken</p>
          <h5>{stats.break} </h5>
        </div>
      </div>

      <div className="item focus">
        <div className="box-item-img">
          <ChartNoAxesCombined size={20} color="#5252E0" strokeWidth={2} />
        </div>

        <div className="item-info">
          <p>Tasks done</p>
          <h5>{stats.tasks} </h5>
        </div>
      </div>
    </div>
  );
};

export default Boxes;
