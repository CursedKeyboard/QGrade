class Subject extends React.Component {
  render() {
    return (
    <div>
    <div className='ui centered column centered grid'>
      <div className='column five wide'>
        <SubjectHeader
          subjectName='Intro to Algorithms'
          subjectAverage={87}  
        />
        </div>
    </div>
      <div className='ui column centered grid'>
        <div className='column twelve wide'>
          <SectionList />
        </div>
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
  render () {
    return (
      <div className='ui centered grid segment' padding='5px'>
        <div className="row">
          <div className='five wide middle aligned column'>
              <SectionHeader
                sectionName='Section A'
                sectionGrade={45}
                sectionWeight={20}
              />
          </div>
          <div className='five wide middle aligned column'>
              <SectionHeader
                sectionName='Section A'
                sectionGrade={45}
                sectionWeight={20}
              />
          </div>
          <div className='five wide middle aligned column'>
              <SectionHeader
                sectionName='Section A'
                sectionGrade={45}
                sectionWeight={20}
              />
          </div>
        </div>
        <div className='row'>
          <div className='four wide middle aligned column'>
                <SectionHeader
                sectionName='Section A'
                sectionGrade={45}
                sectionWeight={20}
              />
          </div>
          <div className='four wide middle aligned column'>
                <SectionHeader
                sectionName='Section A'
                sectionGrade={100}
                sectionWeight={.2}
              />
          </div>
        </div>
      </div>
    );
  }
}

class Section extends React.Component {

}

class SectionHeader extends React.Component {
  render () {
    return (
      //<div className='ui equal width grid'>
      <div className="ui grid card">
        <div className='middle aligned two column row'>
          <div className='nopad middle aligned seven wide column'>
            <div className='middle aligned ui label'>
              <p>{this.props.sectionGrade}% | {this.props.sectionWeight}</p>
            </div>
            <div className='extra content bottom attached'>
            <span className='ui'>
              <span className='add icon'>
                <i className='add icon'/>
              </span>
              <span className='edit icon'>
                <i className='edit icon' />
              </span>
              <span className='trash icon'>
                <i className='trash icon' />
              </span>
            </span>
            </div>
          </div>
          <div className='nopad left aligned nine wide column'>
            <h2>{this.props.sectionName}</h2>
          </div>
        </div>
      </div>
    );
  }
}

class AssignmentList extends React.Component {

}

class Assignment extends React.Component {

}

ReactDOM.render(
  <Subject />,
  document.getElementById('content')
);