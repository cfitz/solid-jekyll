# config valid only for current version of Capistrano
lock '3.3.3'

set :application, 'library.wmu.se'
set :repo_url, 'https://github.com/cfitz/solid-jekyll.git'
set :use_sudo, false
# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call
set :user, "library"
# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/home/library/library.wmu.se'

before 'deploy:updated', 'deploy:update_jekyll'

namespace :deploy do
    [:start, :stop, :restart, :finalize_update].each do |t|
        desc "#{t} task is a no-op with jekyll"
        task t do
          on roles(:all) do ; end
        end
    end

    desc 'Run jekyll to update site before uploading'
    task :update_jekyll do
      on "library@library.wmu.se" do 
        execute( " cd #{release_path}; rm -rf _site/* && jekyll build && rm _site/Capfile && rm -rf _site/config")
      end 
    end
end
# Default value fer :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('bin', 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end
