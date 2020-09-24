FactoryBot.define do
  factory :task do
    name ('テストを書く')
    description('RSPec & Capybara & FactoryBotを準備する')
    user
  end
end
