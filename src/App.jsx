import React, { useState } from 'react'
import { FileText, Search, ExternalLink, Heart, Star, Sparkles, Briefcase, Award, User, PenTool, Eye, Shield, DollarSign } from 'lucide-react'

const categories = [
  { id: 'all', name: '全部' },
  { id: 'builder', name: '简历制作' },
  { id: 'optimize', name: '简历优化' },
  { id: 'template', name: '模板设计' },
  { id: 'ats', name: 'ATS 优化' },
  { id: 'cover', name: '求职信' },
]

const tools = [
  { name: 'Kickresume', category: 'builder', desc: 'AI 驱动的简历和求职信创建平台，提供专业模板和 AI 内容建议', url: 'https://kickresume.com', hot: true, free: false, rating: 4.8, features: ['AI 写作', '专业模板', 'ATS 友好'] },
  { name: 'Resume.io', category: ['builder', 'template'], desc: '全球领先的在线简历制作工具，操作简单设计精美', url: 'https://resume.io', hot: true, free: false, rating: 4.7, features: ['拖拽编辑', 'PDF 导出', '多语言'] },
  { name: 'Rezi', category: ['optimize', 'ats'], desc: '专注 ATS 简历优化，通过率显著提升', url: 'https://rezi.ai', hot: true, free: true, rating: 4.6, features: ['ATS 检测', 'AI 内容', '关键词优化'] },
  { name: 'Jobscan', category: ['ats', 'optimize'], desc: '简历与职位描述匹配度分析，提升面试机会', url: 'https://jobscan.co', hot: true, free: true, rating: 4.6, features: ['匹配分析', '关键词建议', '职位对比'] },
  { name: 'ResumeWorded', category: 'optimize', desc: 'AI 简历内容优化，由招聘专家训练的 AI 引擎', url: 'https://resumeworded.com', free: true, rating: 4.5, features: ['内容优化', '措辞建议', 'ATS 检查'] },
  { name: 'Novoresume', category: ['builder', 'template'], desc: '高端简历模板，支持自定义设计和 AI 内容生成', url: 'https://novoresume.com', free: false, rating: 4.5, features: ['精美模板', 'AI 助手', '实时预览'] },
  { name: 'VisualCV', category: ['builder', 'template'], desc: '可视化简历创建，支持多媒体内容嵌入', url: 'https://visualcv.com', free: true, rating: 4.4, features: ['多媒体', '在线简历', '数据分析'] },
  { name: 'Enhancv', category: ['builder', 'optimize'], desc: '个性化简历创建工具，AI 辅助内容优化', url: 'https://enhancv.com', free: false, rating: 4.4, features: ['个性化设计', 'AI 优化', '故事化简历'] },
  { name: 'Zety', category: ['builder', 'template'], desc: '专业简历构建器，丰富的行业模板', url: 'https://zety.com', free: false, rating: 4.3, features: ['行业模板', '步骤引导', 'AI 写作'] },
  { name: 'Teal', category: ['ats', 'optimize'], desc: 'AI 简历管理平台，支持多版本简历和职位匹配', url: 'https://tealhq.com', free: true, rating: 4.5, features: ['多版本管理', '职位匹配', 'AI 助手'] },
  { name: 'Canva 简历', category: 'template', desc: 'Canva 提供的精美简历模板，设计感强', url: 'https://canva.com', hot: true, free: true, rating: 4.6, features: ['海量模板', '免费使用', '协同编辑'] },
  { name: 'Resume-Library', category: 'template', desc: '免费简历模板库，覆盖多种行业', url: 'https://resumelibrary.com', free: true, rating: 4.2, features: ['免费模板', 'Word 格式', '行业分类'] },
]

function App() {
  const [activeCat, setActiveCat] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('resume-favorites') || '[]') } catch { return [] }
  })

  const toggleFav = (name) => {
    setFavorites(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name])
  }

  const filtered = tools.filter(t => {
    const matchCat = activeCat === 'all' || (Array.isArray(t.category) ? t.category.includes(activeCat) : t.category === activeCat)
    const matchSearch = !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.desc.includes(searchQuery)
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-white/10 bg-gray-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI Resume Builder</h1>
              <p className="text-sm text-white/50">AI 简历生成工具聚合</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            用 AI 打造你的完美简历
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">精选 12 款 AI 简历工具，从制作到优化，一站式解决求职需求</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(c => (
            <button key={c.id} onClick={() => setActiveCat(c.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCat === c.id
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-900 text-white/60 hover:text-white hover:bg-gray-800'}`}>
              {c.name}
            </button>
          ))}
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="搜索简历工具..."
            className="w-full bg-gray-900 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:border-blue-500/50 transition-colors" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filtered.map(tool => {
            const isFav = favorites.includes(tool.name)
            const cats = Array.isArray(tool.category) ? tool.category : [tool.category]
            return (
              <div key={tool.name} className="bg-gray-900 border border-white/5 rounded-2xl p-6 hover:border-blue-500/20 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{tool.name}</h3>
                      {tool.hot && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">HOT</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${tool.free ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {tool.free ? '免费' : '付费'}
                      </span>
                      <span className="text-xs text-yellow-400">★ {tool.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleFav(tool.name)} className={`p-1.5 rounded-lg transition-colors ${isFav ? 'text-blue-400' : 'text-white/20 hover:text-white/50'}`}>
                      <Heart className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} />
                    </button>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-white/20 hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-3">{tool.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tool.features.map(f => (
                    <span key={f} className="text-xs bg-white/5 text-white/40 px-2 py-1 rounded-lg">{f}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <footer className="border-t border-white/5 pt-8 pb-6 text-center text-white/30 text-xs">
          <p className="flex items-center justify-center gap-1 mb-2">Made with <Heart className="w-3 h-3 text-red-400" /> AI Resume Builder</p>
          <p>&copy; 2024 · 用 AI 赢得面试机会</p>
        </footer>
      </div>
    </div>
  )
}

export default App
