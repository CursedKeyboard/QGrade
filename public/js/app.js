class Subject extends React.Component {
  render() {
    return (
    <div className='ui centered column centered grid'>
      <div className='column five wide'>
        <SubjectHeader
          subjectName='Intro to Algorithms'
          subjectAverage={87}  
        />
        </div>
    </div>
    );
  }
}
  
class SubjectHeader extends React.Component {
  render () {
    return (
    <div className='ui equal width grid segment'>
        <div className='ten wide column'>
          <div className='ui'><h2> {this.props.subjectName} </h2></div>
          <div className='ui'><h3> { this.props.subjectAverage}% </h3></div>
        </div>
        <div className='middle aligned column'>
          <button className='ui labeled icon button'>
            <i className='add icon'/>
            Add section
          </button>
        </div>
    </div>
    );
  }
}

class SectionList extends React.Component {

}

class SectionHeader extends React.Component {

}

class AssignmentList extends React.Component {

}

class Assignment extends React.Component {

}

ReactDOM.render(
  <Subject />,
  document.getElementById('content')
);