
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Instamobile</Text>
              <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
              <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}/>
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onLoginPress()}
                title="Login"
              />
              <Button
                buttonStyle={styles.fbLoginButton}
                //onPress={() => this.onFbLoginPress()}
                title="Login with Facebook"
                color="#3897f1"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>


        < >
          </>