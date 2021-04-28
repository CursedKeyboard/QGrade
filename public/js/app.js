class Subject extends React.Component {
  state = {
    assignments: [
      {
        id:uuid.v4(),
        assignmentTitle:"A1",
        assignmentGrade:50,
        assignmentWeight:20,
      },
      {
        id:uuid.v4(),
        assignmentTitle:"Assignment 2: Sockets and Communications",
        assignmentGrade:67,
        assignmentWeight:54,
      },
      {
        id:uuid.v4(),
        assignmentTitle:"Tutorial",
        assignmentGrade:100,
        assignmentWeight:10,
      },
      {
        id:uuid.v4(),
        assignmentTitle:"Final exam",
        assignmentGrade:23,
        assignmentWeight:100,
      },
    ],
    addingAssignmentOpen: false,
    subjectAverage: 87,
    subjectName: 'Intro to Algorithms'
  };
  
  render() {
    return (
    <div>
      <div className='ui centered column grid'>
        <div className='column five wide'>
          <SubjectHeader
            subjectName={this.state.subjectName}
            subjectAverage={this.state.subjectAverage}
            handleOpenAddAssignment={this.handleOpenAddAssignment}
          />
          </div>
      </div>
      <ToggleableAssignmentForm 
        handleCloseAddAssignment={this.handleCloseAddAssignment}
        handleAssignmentCreate={this.handleAssignmentCreate}
        formOpen={this.state.addingAssignmentOpen}
      />
      <div className='ui column centered grid'>
        <div className='ui column twelve wide'>
          <AssignmentList 
            assignments={this.state.assignments}
            handleEdit={this.handleAssignmentEdit}
            handleDelete={this.handleAssignmentDelete}
          />
        </div>
      </div>
    </div>
    );
  }

  handleOpenAddAssignment = () => {
    this.setState({'addingAssignmentOpen': true});
  };

  handleCloseAddAssignment = () => {
    this.setState({'addingAssignmentOpen': false});
  };

  updateSubjectGrade = () => {
    let total_weight = 0;
    let avg = 0;
    let i = 0;
    for(i = 0; i < this.state.assignments.length; i++){
      let weight = this.state.assignments[i].assignmentWeight;
      total_weight = total_weight + weight;
    }
    for(i = 0; i < this.state.assignments.length; i++){
      const weight = this.state.assignments[i].assignmentWeight;
      const grade = this.state.assignments[i].assignmentGrade;
      if(weight > 0){
        const weight_proportion = weight/total_weight;
        const avg_adjusted = Math.round(weight_proportion * grade);
        avg = avg + avg_adjusted;
      }
    }
    this.setState({'subjectAverage': avg});
  };

  handleAssignmentCreate = (assignment) => {
    console.log(assignment.assignmentGrade, assignment.assignmentTitle, assignment.assignmentWeight);
    this.createAssignment(assignment);
    this.handleCloseAddAssignment();
  };

  createAssignment = (assignment) => {
    const t = helpers.newAssignment(assignment);
    this.setState({
      assignments: this.state.assignments.concat(t)},
      () => this.updateSubjectGrade()
      );
  };

  handleAssignmentEdit = (attrs) => {
    this.editAssignment(attrs);
  };

  editAssignment = (attrs) => {
    this.setState ({
      assignments: this.state.assignments.map((assignment) => {
        if(assignment.id === attrs.id) {
          return Object.assign({}, assignment, {
            assignmentTitle: attrs.assignmentTitle,
            assignmentGrade: attrs.assignmentGrade,
            assignmentWeight: attrs.assignmentWeight
          });
        }
        else {
          return assignment;
        }
      }),
      }, 
      () => this.updateSubjectGrade()
    );
  };

  handleAssignmentDelete = (attrs) => {
    this.assignmentDelete(attrs);
  };

  assignmentDelete = (attrs) => {
    this.setState({
      assignments: this.state.assignments.filter(a => a.id !== attrs.id)},
      () => this.updateSubjectGrade()
    );
  };


}

class ToggleableAssignmentForm extends React.Component {
  render() {
    if (this.props.formOpen){
      return (
        <div className='ui centered cards'>
            <AssignmentForm
              handleClose={this.props.handleCloseAddAssignment}
              handleSubmit={this.props.handleAssignmentCreate}
            />
        </div>
      );
    }
    return null;
  }
}

class SubjectHeader extends React.Component {
  render () {
    return (
    <div className='ui equal width grid segment'>
        <div className='ten wide column'>
          <div className='ui'><h2> {this.props.subjectName} </h2></div>
          <div className='ui'><h3> {this.props.subjectAverage}% </h3></div>
        </div>
        <div className='middle aligned column'>
          <button className='ui labeled icon button' onClick={this.props.handleOpenAddAssignment}>
            <i className='add icon'/>
            Add Assignment
          </button>
        </div>
    </div>
    );
  }
}

class AssignmentList extends React.Component {
  render () {
    const assignments = this.props.assignments.map((assignment) => (
      <EditableAssignment
        key={assignment.id}
        id={assignment.id}
        assignmentTitle={assignment.assignmentTitle}
        assignmentGrade={assignment.assignmentGrade}
        assignmentWeight={assignment.assignmentWeight}
        editFormOpen={false}
        handleEdit={this.props.handleEdit}
        handleDelete={this.props.handleDelete}
      />
    ));
    return (
      <div className='ui centered cards'>
        {assignments}
      </div>
    );
  }
}

class EditableAssignment extends React.Component { // manage formOpen 
  state = {
    formOpen: false,
  }

  render () {
    if(this.state.formOpen) {
      return ( 
        <AssignmentForm
          assignmentTitle={this.props.assignmentTitle}
          assignmentGrade={this.props.assignmentGrade}
          assignmentWeight={this.props.assignmentWeight}
          id={this.props.id}
          handleClose={this.handleFormClose}
          handleSubmit={this.handleFormEdit}
        />
      );
    }
    else {
      return (
        <Assignment
          assignmentTitle={this.props.assignmentTitle}
          assignmentGrade={this.props.assignmentGrade}
          assignmentWeight={this.props.assignmentWeight}
          id={this.props.id}
          openForm={this.handleFormOpen}
          handleDelete={this.props.handleDelete}
        />
      );
    }
  }

  handleFormOpen = () => {
    this.setState({formOpen: true});
  };

  handleFormClose = () => {
    this.setState({formOpen: false});
  };

  handleFormEdit = (attrs) => {
    attrs['id'] = this.props.id;
    this.props.handleEdit(attrs);
  };
}

class Assignment extends React.Component {
  render () {
    return (
      <div className="card">
        <div className='content'>
          <div className='header'>
            {this.props.assignmentTitle}
          </div>
          <div className='description'>
            Grade: {this.props.assignmentGrade}% | Weight: {this.props.assignmentWeight}
          </div>
        </div>
        <div className='ui two bottom attached buttons'>
          <button className='ui button' onClick={this.props.openForm}>
            <i className='edit icon'/>Edit
          </button>
          <div className='ui button' onClick={this.handleDelete}>
            <i className='trash icon'/>Delete
          </div>
        </div>
      </div>
    );
  }

  handleDelete = () => {
    this.props.handleDelete({
      id: this.props.id
    });
  };
}

class AssignmentForm extends React.Component {
  state = {
    title: this.props.assignmentTitle || '',
    grade: this.props.assignmentGrade || 0,
    weight: this.props.assignmentWeight || 0,
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleGradeChange = (e) => {
    const input = e.target.value;
    let grade = 0;
    if(input !== ''){
      grade = parseInt(input);
    }
    this.setState({ grade: grade });
  };

  handleWeightChange = (e) => {
    const input = e.target.value;
    let weight = 0;
    if(input !== ''){
      weight = parseInt(input);
    }
    this.setState({ weight: weight });
  };

  handleSubmit = () => {
    this.props.handleSubmit({
      assignmentTitle: this.state.title,
      assignmentGrade: this.state.grade,
      assignmentWeight: this.state.weight
    });
    this.props.handleClose();
  };

  render () {
    const submitText = this.props.id ? 'Update' : 'Create'
    return (
      <form className="card">
        <div className='content'>
          <div className='header'>
            Title:
            <input 
              type='text'
              size='12' 
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </div>
          <div className='description inline-block'>
              Grade: 
              <input
                size='4'
                value={this.state.grade}
                onChange={this.handleGradeChange}
              /> Weight:  
              <input
                size='4'
                value={this.state.weight}
                onChange={this.handleWeightChange}
                label="Weight"
              />
          </div>
        </div>
        <div className='ui two bottom attached buttons'>
          <button className='ui blue button' type='Submit' onClick={this.handleSubmit}>
            {submitText}
          </button>
          <button className='ui red button' onClick={this.props.handleClose}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

ReactDOM.render(
  <Subject />,
  document.getElementById('content')
);