import PropTypes, {InferProps} from 'prop-types'
import TopCards from './TopCards';
import BarChart from './BarChart';
import Members from './Members';
import ListBox from './ListBox';

function DashBoard({data}: InferProps<typeof DashBoard.propTypes>) {
  return (
    <div className="p-4">
      <ListBox list={data} />
      <TopCards teamData={data[0]} />
      <div className="pt-4 pr-4 grid md:grid-cols-3 grid-cols-1 gap-4 ">
        <BarChart teamData={data[0]} />
        <Members teamData={data[0]} />
      </div>
    </div>
  );
}

DashBoard.propTypes = {
    data: PropTypes.any
}

export default DashBoard;
