'use client'

export function NewsWidget() {
  const mockNews = [
    {
      id: 1,
      title: 'NIFTY touches new all-time high amid strong FII inflows',
      time: '2 hours ago',
      category: 'Market',
    },
    {
      id: 2,
      title: 'RBI keeps repo rate unchanged at 6.5%',
      time: '4 hours ago',
      category: 'Policy',
    },
    {
      id: 3,
      title: 'TCS reports strong Q3 earnings, beats estimates',
      time: '6 hours ago',
      category: 'Earnings',
    },
    {
      id: 4,
      title: 'Banking stocks rally on credit growth optimism',
      time: '8 hours ago',
      category: 'Sector',
    },
  ]

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Market News
      </h3>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="space-y-3">
          {mockNews.map((news) => (
            <div
              key={news.id}
              className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                  {news.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {news.time}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white leading-tight">
                {news.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}