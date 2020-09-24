class SessionsController < ApplicationController
  skip_before_action :login_required


  def new
  end

  def create
    user = User.find_by(email: session_params[:email])

    if user&.authenticate(session_params[:password])
      log_in user
      params[:session][:remember_me] == '1' ? remember(user) : forget(user)
      remember user
      redirect_to root_url, notice: 'ログインしました。'
    else
      render :new
    end
  end

  def destroy
    log_out
    redirect_to root_url, notice: 'ログアウトしました。'
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
