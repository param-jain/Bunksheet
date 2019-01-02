ViewComponent={require('react-native-linear-gradient').LinearGradient}
                            linearGradientProps={{
                                colors: ['#FF9800', '#F44336'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}


                            <Button
                                //buttonStyle={styles.signUpButton}
                                title="Sign Up"
                                onPress={() => this.onSignUpPress()}
                            />


8ccefae6e97e50110852a480a12b51031e34c28e