import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { user_read, user_update } from './store/actions';
import { NavigationEvents } from 'react-navigation';
import { styles, Color } from './styles';
import { connect } from 'react-redux';
import EditUser from './edit';
import ViewUser from './view';

export class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isEdit: false,
    };
  }

  load() {
    const { navigation } = this.props;
    const { token, auth_user } = this.props;

    if (!token && auth_user !== {}) {
      this.props.navigation.navigate('BasicLoginSignup');
      return;
    }

    const id = navigation.getParam('id', 'UserProfile') || auth_user.id;
    if (id === auth_user.id) this.setState({ isEdit: true });
    this.props.getUser(id, token);
  }

  componentDidUpdate() {
    const { loading } = this.state;
    const { user, api } = this.props;

    if (loading && !api.isLoading && user !== {})
      this.setState({ loading: false });
  }

  render() {
    const { isEdit, loading } = this.state;
    return (
      <ScrollView style={styles.container} contentStyle={styles.content}>
        <NavigationEvents
          onDidFocus={() => this.load()}
          onWillFocus={() => this.setState({ loading: true })}
          onDidBlur={() => {
            this.setState({ isEdit: false });
            this.props.navigation.setParams({ id: null });
          }}
        />
        {loading ? (
          <View>
            <ActivityIndicator color={Color.steel} />
          </View>
        ) : (
            <View>
              {isEdit ? (
                <EditUser {...this.props} />
              ) : (
                  <ViewUser {...this.props} />
                )}
            </View>
          )}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id =
    state.authReducer.user.id;
  //ownProps.navigation.getParam('id', 'UserProfile') ||

  console.log("id", id)
  console.log("user.id", state.authReducer.user.id)

  console.log(state.userReducer.users)

  return {
    token: state.authReducer.token,
    auth_user: state.authReducer.user,
    api: state.userReducer.api,
    user: state.userReducer.users.find(user => user.id == id) || {},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: (id, token) => dispatch(user_read(id, token)),
    updateUser: (data, token) => dispatch(user_update(data, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetail);
