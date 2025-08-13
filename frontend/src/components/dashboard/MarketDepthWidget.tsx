'use client'

export function MarketDepthWidget() {
  const mockBids = [
    { price: 2735.50, quantity: 150, orders: 5 },
    { price: 2735.25, quantity: 200, orders: 8 },
    { price: 2735.00, quantity: 300, orders: 12 },
    { price: 2734.75, quantity: 180, orders: 6 },
    { price: 2734.50, quantity: 250, orders: 9 },
  ]

  const mockAsks = [
    { price: 2735.75, quantity: 120, orders: 4 },
    { price: 2736.00, quantity: 180, orders: 7 },
    { price: 2736.25, quantity: 220, orders: 10 },
    { price: 2736.50, quantity: 160, orders: 5 },
    { price: 2736.75, quantity: 200, orders: 8 },
  ]

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Market Depth (RELIANCE)
      </h3>

      <div className="flex-1 grid grid-cols-2 gap-4 text-xs">
        {/* Bids */}
        <div>
          <div className="text-success-600 font-medium mb-2">Bids</div>
          <div className="space-y-1">
            {mockBids.map((bid, index) => (
              <div key={index} className="flex justify-between items-center p-1 rounded bg-success-50 dark:bg-success-900/20">
                <span className="text-success-700 dark:text-success-400 font-medium">
                  {bid.price.toFixed(2)}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {bid.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Asks */}
        <div>
          <div className="text-danger-600 font-medium mb-2">Asks</div>
          <div className="space-y-1">
            {mockAsks.map((ask, index) => (
              <div key={index} className="flex justify-between items-center p-1 rounded bg-danger-50 dark:bg-danger-900/20">
                <span className="text-danger-700 dark:text-danger-400 font-medium">
                  {ask.price.toFixed(2)}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {ask.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            ₹2735.60
          </div>
          <div className="text-sm text-success-600">
            +15.45 (+0.57%)
          </div>
        </div>
      </div>
    </div>
  )
}