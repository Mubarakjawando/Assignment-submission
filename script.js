function showTab(tab) {
  document.getElementById('register').classList.add('hidden');
  document.getElementById('login').classList.add('hidden');
  document.getElementById(tab).classList.remove('hidden');
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

async function registerStudent() {
  var fullName = document.getElementById('reg-name').value.trim();
  var email = document.getElementById('reg-email').value.trim();
  var matric = document.getElementById('reg-matric').value.trim();
  var level = document.getElementById('reg-level').value;
  var password = document.getElementById('reg-password').value;
  var confirm = document.getElementById('reg-confirm').value;
  var msg = document.getElementById('reg-message');

  if (fullName == '' , email == '' , matric == '' , level == '' , password == '') {
    msg.textContent = 'Please fill in all fields.';
    msg.className = 'message error';
    return;
  }

  if (password !== confirm) {
    msg.textContent = 'Passwords do not match.';
    msg.className = 'message error';
    return;
  }

  try {
    var result = await supabaseClient.auth.signUp({
      email: email,
      password: password
    });

    if (result.error) throw result.error;

    var insert = await supabaseClient.from('users').insert([{
      id: result.data.user.id,
      full_name: fullName,
      email: email,
      matric_number: matric,
      role: 'student',
      level: level
    }]);

    if (insert.error) throw insert.error;

    msg.textContent = 'Registration successful! Now Login.';
    msg.className = 'message success';

  } catch (err) {
    msg.textContent = 'Error: ' + err.message;
    msg.className = 'message error';
  }
}

async function loginUser() {
  var email = document.getElementById('login-email').value.trim();
  var password = document.getElementById('login-password').value;
  var msg = document.getElementById('login-message');

  if (email == '' || password == '') {
    msg.textContent = 'Please enter email and password.';
    msg.className = 'message error';
    return;
  }

  try {
    var result = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (result.error) throw result.error;

    msg.textContent = 'Login successful! Redirecting...';
    msg.className = 'message success';

    // Get user role and redirect
    setTimeout(async function() {
      var profile = await supabaseClient
        .from('users')
        .select('role')
        .eq('id', result.data.user.id)
        .single();

      if (profile.data.role === 'lecturer') {
        window.location.href = 'lecturer-dashboard.html';
      } else {
        window.location.href = 'student-dashboard.html';
      }
    }, 1000);

  } catch (err) {
    msg.textContent = 'Error: ' + err.message;
    msg.className = 'message error';
  }

  function showForgotPassword() {
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('forgot-section').style.display = 'block';
  document.getElementById('reset-message').textContent = '';
}

function showLogin() {
  document.getElementById('forgot-section').style.display = 'none';
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('login-message').textContent = '';
}

async function sendResetEmail() {
  var email = document.getElementById('reset-email').value.trim();
  var msg = document.getElementById('reset-message');

  if (!email) {
    msg.textContent = 'Please enter your email address.';
    msg.className = 'message error';
    return;
  }

  msg.textContent = 'Sending reset link...';
  msg.className = 'message';

  var result = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/reset-password.html'
  });

  if (result.error) {
    msg.textContent = 'Error: ' + result.error.message;
    msg.className = 'message error';
    return;
  }

  msg.textContent = '✅ Reset link sent! Check your email inbox.';
  msg.className = 'message success';
}
function showForgotPassword() {
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('forgot-section').style.display = 'block';
  document.getElementById('reset-message').textContent = '';
}

function showLogin() {
  document.getElementById('forgot-section').style.display = 'none';
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('login-message').textContent = '';
}


}
