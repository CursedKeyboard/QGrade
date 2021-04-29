class Big extends React.Component {
  render () {
    return (
    <div id='Main-container'>
      <Subject/>
      <SidebarOverall />
    </div>
    );
  }
}

class SidebarOverall extends React.Component {
  state = {
    showSidebar: false
  };

  render () {
    return (
    <div id='Sidebar' className='ui column three wide grid'>
        <i id='FAQButton' className='circular big blue question icon' onClick={this.toggleHelp}/>
      <a href='https://github.com/CursedKeyboard/QGrade' target="_blank">
          <i id='source' className='circular big blue github icon'/>
      </a>

      <Sidebar 
        showSidebar={this.state.showSidebar}
      />
    </div>
    );
  }

  toggleHelp = () => {
    this.setState({
      showSidebar: !this.state.showSidebar
    });
  };
}

class Sidebar extends React.Component {
  render () {
    if(this.props.showSidebar){
      return (
        <div id='sidebarFAQ' className='ui card'>
          <div className='content'>
            <div className='header'>
              Welcome to Calqlator
            </div>
            <div className='description'>
              A grade calculator with the ability to parse data from quercus
            </div>
          </div>
          <div className='content'>
            <div className='header'>
              Why should I use this over my own excel sheet?
            </div>
            <div className='description'>
              This site allows you to copy assignments from quercus in seconds and is made for faster workflow!
            </div>
          </div>
          <div className='content'>
            <div className='header'>
              How do I insert my quercus data?
            </div>
            <div className='description'>
              To copy paste your quercus data, go to your grades quercus page, and click inspect element anywhere on the page. 
              Then, right-click the second-topmost line in the newly appeared window (you might have to scroll up).  
            </div>
            <div className='img'>
              <img className='help-image' src='../images/How-To-Find-Top-HTML.JPG'/>
            </div>
            <div className='description'>
              Once you've done this, choose the copy -> innerHTML option
            </div>
            <div className='img'>
              <img className='help-image' src='../images/How-To-Copy-InnerHTML.JPG'/>
            </div>
            <div className='description'>
              Finally, navigate to this site. Click the file icon at the
              top to import your html. You should be shown box which asks you to paste your html. Paste via right-click -> paste
              or control v and click submit!
            </div>
            <div className='img'>
              <img className='help-image' src='../images/How-To-Paste-HTML.JPG'/>
            </div>
          </div>
          <div className='content'>
            <div className='header'>
              I Imported Data and My Grades Have NAN! Is This Bad?
            </div>
            <div className='description'>
              Nan just means the grade is not available on quercus. You will have to manually adjust the grade yourself.
            </div>
          </div>
          <div className='content'>
            <div className='header'>
              I dont want to spend much time on this. How can I get the fastest workflow possible?
            </div>
            <div className='description'>
              You can achieve a faster workflow by tabbing through assignments and input boxes. 
            </div>
            <div className='description'>For example,
              if I had three assignments and wanted to quickly change the grade of assignment 1 and weight of assignment 3, 
              I would click the top of my screen, press tab a couple of times until I reached assignment 1's edit button and 
              press enter. Then, I would press tab a couple more times until I reached the box asking for my new assignment grade,
              change the grade, and press enter.
            </div>
            <div className='description'>
              From here, I can tab twice and reach the edit button for assignment 3, press enter,
              tab down to the box asking for the new weight, change the weight, and press enter.
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        null
      );
    }
  }
}
class Subject extends React.Component {
  state = {
    assignments: [],
    assignmentFormOpen: false,
    subjectAverage: 100,
    subjectName: 'Barnacles',
    htmlFormOpen: false,
  };
  
  render() {
    return (
    <div>
      <div className='ui centered column grid'>
        <div className='column five wide'>
          <SubjectHeader
            subjectName={this.state.subjectName}
            subjectAverage={this.state.subjectAverage}
            handleOpenAddAssignment={this.toggleAssignmentForm}
            handleEditName={this.handleSubjectNameChange}
            handleImportHTML={this.toggleHTMLForm}
          />
          </div>
      </div>
      <ImportHTMLForm 
        formOpen={this.state.htmlFormOpen}
        closeForm={this.closeImportHTML}
        submitForm={this.handleSubmitHTML}
      />
      <ToggleableAssignmentForm 
        handleClose={this.handleCloseAddAssignment}
        handleSubmit={this.handleAssignmentCreate}
        formOpen={this.state.assignmentFormOpen}
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
    this.setState({assignmentFormOpen: true},
      this.closeImportHTML());
  };

  handleCloseAddAssignment = () => {
    this.setState({assignmentFormOpen: false});
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
    if (total_weight === 0){
      avg = 100;
    }
    this.setState({'subjectAverage': avg});
  };

  handleAssignmentCreate = (assignment) => {
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

  handleSubjectNameChange = (attrs) => {
    this.setState({
      subjectName: attrs.subjectName
    });
  };

  openImportHTML = () => {
    this.setState({
      htmlFormOpen: true
    }, () => this.handleCloseAddAssignment());
  };

  closeImportHTML = () => {
    this.setState({
      htmlFormOpen: false
    });
  };

  handleSubmitHTML = (attrs) => {
    const createBulkAssignments = this.createBulkAssignments; // Needs to be defned because 'this' changes in jquery scope :(
    let assignment_attrs = [];
    const assignment_list = $('#grades_summary tr', attrs.htmlText).filter('.student_assignment').filter('.editable');
    assignment_list.each(function(index){
      const title = $(this).find('th').find('a').text();
      let points_earned = $(this).find('.grade').text().split(/\s+/);
      points_earned = parseFloat(points_earned[points_earned.length - 2]);
      const points_total = parseFloat($(this).find('.points_possible').text());
      const average = Math.round((points_earned / points_total) * 100);
      const attrs = {
        assignmentTitle: title, 
        assignmentGrade: average,
        assignmentWeight: 0
      };
      assignment_attrs.push(attrs);
    });

    createBulkAssignments(assignment_attrs);
    this.closeImportHTML();
  };

  createBulkAssignments = (assignment_attrs) => {
    let i;
    for(i = 0; i < assignment_attrs.length; i++){
      assignment_attrs[i] = helpers.newAssignment(assignment_attrs[i]);
    }
    this.setState({
      assignments: this.state.assignments.concat(assignment_attrs)
    }, () => this.updateSubjectGrade());
  };

  toggleHTMLForm = () => {
    if(!this.state.htmlFormOpen){
      this.openImportHTML();
    }
    else{
      this.closeImportHTML();
    }
  };

  toggleAssignmentForm = () => {
    if(!this.state.assignmentFormOpen){
      this.handleOpenAddAssignment();
    }
    else{
      this.handleCloseAddAssignment();
    }
  };
  
}

class ImportHTMLForm extends React.Component {
  state = {
    htmlText: ''
  };
  
  render () {
    if (this.props.formOpen){
      return (
        <div className='ui centered column grid'>
          <div className='middle aligned card'>
            <div className='ui'>
              <textarea
                placeholder='Paste your quercus html here!'
                value={this.state.htmlText}
                rows='1'
                cols='30'
                onChange={this.changeTextArea}
              />
            </div>
            <div className='ui two buttons'>
              <button className='button' onClick={this.submitForm}>
                Submit
              </button>
              <button className='button' onClick={this.props.closeForm}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    }
    else {
      return null;
    }
  }

  changeTextArea = (e) => {
    const html = e.target.value;
    this.setState({
      htmlText: html
    });
  };

  submitForm = () => {
    this.props.submitForm(this.state);
  };
}
class ToggleableAssignmentForm extends React.Component {
  render() {
    if (this.props.formOpen){
      return (
        <div className='ui centered cards'>
            <AssignmentForm
              handleClose={this.props.handleClose}
              handleSubmit={this.props.handleSubmit}
            />
        </div>
      );
    }
    return null;
  }
}

class SubjectHeader extends React.Component {
  state = {
    editable: false
  }
  render () {
    if(!this.state.editable){
      return (
        <div className='ui equal width grid segment'>
            <div className='ten wide column'>
              <div className='ui'><h2> {this.props.subjectName} </h2></div>
              <div className='ui'>
                <h3>
                  {this.props.subjectAverage}%
                </h3>
              </div>
            </div>
            <div id="buttonIconsColumn" className='middle aligned column'>
              <div id="buttonIcons" className='three buttons'>
              <button className='ui circular icon button' onClick={this.props.handleOpenAddAssignment}>
                <i className='add icon'/>
              </button>
              <button tabIndex='-1' className='ui circular icon button' onClick={this.props.handleImportHTML}>
                <i className='file icon'/>
              </button>
              <button tabIndex='-1' className='ui circular icon button' onClick={this.formOpen}>
                <i className='edit icon'/>
              </button>
              </div>
            </div>
        </div>
      );
    }
    else{
      return (
        <SubjectHeaderForm 
          subjectName = {this.props.subjectName}
          formCancel = {this.formClose}
          editName = {this.handleEditName}
          subjectAverage = {this.props.subjectAverage}
        />
      );
    }
  }

  formClose = () => {
    this.setState({editable: false});
  }

  formOpen = () => {
    this.setState({editable: true});
  }

  handleEditName = (attrs) => {
    this.props.handleEditName(attrs);
    this.formClose();
  }
}

class SubjectHeaderForm extends React.Component {
  state = {
    subjectName: this.props.subjectName
  };

  inputNameChange = (e) => {
    this.setState({subjectName: e.target.value});
  }

  nameChangeSubmit = () => {
    this.props.editName(this.state);
  }

  render () {
    return (
      <form className='ui equal width grid segment'>
        <div className='ten wide column'>
          <div className='input'>
            <input
              id="subjectNameInput"
              value={this.state.subjectName}
              onChange={this.inputNameChange}
            />
          </div>
          <div className='ui'>
            <h3>
              {this.props.subjectAverage}%
            </h3>
          </div>
        </div>
        <div className='ui middle aligned column'>
          <div className='ui two buttons'>
            <button className='button' type='Submit' onClick={this.nameChangeSubmit}>
              {"Save"}
            </button>
            <div className='or'></div>
            <button className='button' onClick={this.props.formCancel}>
              {"Cancel"}
            </button>
          </div>
        </div>
      </form>
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSubmit({
      assignmentTitle: this.state.title,
      assignmentGrade: this.state.grade,
      assignmentWeight: this.state.weight
    });
    this.props.handleClose();
  };

  handleClose = (e) => {
    e.preventDefault();
    this.props.handleClose();
  }

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
          <div className='or'></div>
          <button className='ui red button' onClick={this.handleClose}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

ReactDOM.render(
  <Big />,
  document.getElementById('content')
);