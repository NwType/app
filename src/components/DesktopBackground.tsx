'use client'
import { useEffect, useState, useMemo } from 'react'

interface Star    { id: number; x: number; y: number; size: number; dur: string; delay: string }
interface Firefly { id: number; x: number; y: number; dur: number; delay: number; size: number }
interface Zipzip  { id: number; y: number; dur: number; delay: number; dir: 'ltr' | 'rtl'; scale: number }

// ─── Constellation data ──────────────────────────────────────────────────────
const ORION_LINES = [
  [[0.57,0.28],[0.60,0.27]], [[0.60,0.27],[0.63,0.26]],
  [[0.52,0.18],[0.57,0.28]], [[0.68,0.20],[0.63,0.26]],
  [[0.57,0.28],[0.54,0.42]], [[0.63,0.26],[0.66,0.40]],
  [[0.60,0.12],[0.60,0.18]], [[0.60,0.27],[0.60,0.34]],
]
const ORION_STARS = [
  {x:0.57,y:0.28,r:2.5},{x:0.60,y:0.27,r:2.5},{x:0.63,y:0.26,r:2.5},
  {x:0.52,y:0.18,r:2.5},{x:0.68,y:0.20,r:2.5},
  {x:0.54,y:0.42,r:2},  {x:0.66,y:0.40,r:3},
  {x:0.60,y:0.12,r:1.5},
]
const GEMINI_STARS = [{x:0.76,y:0.15,r:2.5},{x:0.82,y:0.13,r:3}]
const LIBRA_STARS  = [{x:0.72,y:0.52,r:2},{x:0.78,y:0.48,r:2},{x:0.84,y:0.52,r:2}]

function OrionSVG() {
  return (
    <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}
      viewBox="0 0 1 1" preserveAspectRatio="none">
      {ORION_LINES.map((s,i)=>(
        <line key={i} x1={s[0][0]} y1={s[0][1]} x2={s[1][0]} y2={s[1][1]}
          stroke="#7bb8ff" strokeWidth="0.0015" strokeOpacity="0.45" strokeDasharray="0.004 0.004"/>
      ))}
      {ORION_STARS.map((s,i)=>(
        <circle key={i} cx={s.x} cy={s.y} r={s.r*0.0012} fill="#fffce8" opacity="0.95"
          style={{filter:'drop-shadow(0 0 2px #7bb8ff)'}}/>
      ))}
      <text x={0.60} y={0.07} fontSize="0.018" fill="#7bb8ff" opacity="0.65"
        fontFamily="'Press Start 2P',monospace" textAnchor="middle">ORION</text>
    </svg>
  )
}
function LabelSVG({stars,color,label,lx,ly}:{stars:{x:number,y:number,r:number}[];color:string;label:string;lx:number;ly:number}) {
  return (
    <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}
      viewBox="0 0 1 1" preserveAspectRatio="none">
      {stars.map((s,i)=>(
        <circle key={i} cx={s.x} cy={s.y} r={s.r*0.0013} fill="#fffce8" opacity="0.9"
          style={{filter:`drop-shadow(0 0 3px ${color})`}}/>
      ))}
      <text x={lx} y={ly} fontSize="0.016" fill={color} opacity="0.55"
        fontFamily="'Press Start 2P',monospace" textAnchor="middle">{label}</text>
    </svg>
  )
}

// ─── Full Moon ───────────────────────────────────────────────────────────────
function FullMoon() {
  return (
    <div style={{position:'absolute',top:'3%',right:'4%',zIndex:3}}>
      <div style={{
        position:'absolute', inset:-28, borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(255,252,200,0.15) 20%, rgba(255,252,200,0.05) 55%, transparent 80%)',
        animation:'moonPulse 5s ease-in-out infinite',
      }}/>
      <div style={{
        width:60, height:60, borderRadius:'50%',
        background:'radial-gradient(circle at 32% 32%, #fffff8 0%, #fffce0 45%, #f5e060 100%)',
        boxShadow:'0 0 35px rgba(255,252,160,0.8), 0 0 70px rgba(255,252,160,0.25), inset -4px -4px 8px rgba(180,150,30,0.15)',
        position:'relative',
      }}>
        <div style={{position:'absolute',width:10,height:10,borderRadius:'50%',background:'rgba(160,140,40,0.15)',top:8, left:10}}/>
        <div style={{position:'absolute',width:6, height:6, borderRadius:'50%',background:'rgba(160,140,40,0.12)',top:22,left:34}}/>
        <div style={{position:'absolute',width:8, height:8, borderRadius:'50%',background:'rgba(160,140,40,0.10)',top:38,left:14}}/>
        <div style={{position:'absolute',width:4, height:4, borderRadius:'50%',background:'rgba(160,140,40,0.08)',top:10,left:42}}/>
      </div>
    </div>
  )
}

// ─── Vivid Trees ─────────────────────────────────────────────────────────────
const TREES = [
  // Left side cluster
  {l:'1%',  h:72, trunk:10, w:22, color:'#0d3b0d', glowColor:'rgba(30,120,30,0.25)', delay:0},
  {l:'5%',  h:55, trunk:8,  w:18, color:'#0a2e0a', glowColor:'rgba(20,100,20,0.2)',  delay:0.4},
  {l:'9%',  h:80, trunk:10, w:24, color:'#0f4010', glowColor:'rgba(35,130,35,0.3)',  delay:0.8},
  {l:'13%', h:48, trunk:7,  w:16, color:'#0a300a', glowColor:'rgba(25,110,25,0.2)',  delay:0.2},
  // Right side cluster
  {l:'83%', h:60, trunk:9,  w:20, color:'#0d3b0d', glowColor:'rgba(30,120,30,0.25)', delay:0.5},
  {l:'87%', h:82, trunk:11, w:25, color:'#0f4210', glowColor:'rgba(35,140,35,0.3)',  delay:0.1},
  {l:'91%', h:52, trunk:8,  w:18, color:'#0a2e0a', glowColor:'rgba(20,100,20,0.2)',  delay:0.7},
  {l:'95%', h:70, trunk:10, w:22, color:'#0d3b0d', glowColor:'rgba(30,120,30,0.25)', delay:0.3},
  {l:'98%', h:45, trunk:7,  w:16, color:'#093009', glowColor:'rgba(18,95,18,0.18)',  delay:0.9},
]

function VividTree({t, idx}:{t:typeof TREES[0];idx:number}) {
  const coneH = Math.round(t.h * 0.72)
  return (
    <div style={{position:'absolute',bottom:0,left:t.l,display:'flex',flexDirection:'column',alignItems:'center',
      animation:`treeSway ${3.5+idx*0.4}s ease-in-out ${t.delay}s infinite`,
      transformOrigin:'bottom center',
    }}>
      {/* Triple-layered crown for depth */}
      <div style={{position:'relative',marginBottom:-4}}>
        {/* Top small cone */}
        <div style={{
          width:0, height:0, margin:'0 auto',
          borderLeft:`${Math.round(t.w*0.5)}px solid transparent`,
          borderRight:`${Math.round(t.w*0.5)}px solid transparent`,
          borderBottom:`${Math.round(coneH*0.4)}px solid ${t.color}`,
          filter:`drop-shadow(0 0 6px ${t.glowColor})`,
          position:'relative', zIndex:3,
        }}/>
        {/* Mid cone */}
        <div style={{
          width:0, height:0, margin:'-6px auto 0',
          borderLeft:`${Math.round(t.w*0.7)}px solid transparent`,
          borderRight:`${Math.round(t.w*0.7)}px solid transparent`,
          borderBottom:`${Math.round(coneH*0.45)}px solid ${t.color}`,
          filter:`drop-shadow(0 0 8px ${t.glowColor})`,
          position:'relative', zIndex:2,
        }}/>
        {/* Base wide cone */}
        <div style={{
          width:0, height:0, margin:'-8px auto 0',
          borderLeft:`${t.w}px solid transparent`,
          borderRight:`${t.w}px solid transparent`,
          borderBottom:`${Math.round(coneH*0.5)}px solid ${t.color}`,
          filter:`drop-shadow(0 0 10px ${t.glowColor})`,
          position:'relative', zIndex:1,
        }}/>
      </div>
      {/* Trunk */}
      <div style={{
        width:t.trunk, height:Math.round(t.h*0.28),
        background:`linear-gradient(180deg,${t.color},#050f05)`,
        border:'1px solid #030803',
      }}/>
    </div>
  )
}

// ─── Fireflies ────────────────────────────────────────────────────────────────
function FireflyLayer({flies}:{flies:Firefly[]}) {
  return (
    <>
      {flies.map(f=>(
        <div key={f.id} style={{
          position:'absolute',
          left:`${f.x}%`, top:`${f.y}%`,
          width:f.size, height:f.size, borderRadius:'50%',
          background:'#aaffaa',
          boxShadow:`0 0 ${f.size*3}px ${f.size}px rgba(120,255,120,0.7)`,
          animation:`fireflyFloat ${f.dur}s ease-in-out ${f.delay}s infinite, fireflyGlow ${f.dur*0.6}s ease-in-out ${f.delay}s infinite`,
          pointerEvents:'none', zIndex:5,
        }}/>
      ))}
    </>
  )
}

// ─── Ground Fog ───────────────────────────────────────────────────────────────
function GroundFog() {
  return (
    <div style={{
      position:'absolute', bottom:24, left:0, right:0, height:40, zIndex:3, pointerEvents:'none', overflow:'hidden',
    }}>
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to top, rgba(10,30,50,0.6) 0%, rgba(10,30,50,0.1) 60%, transparent 100%)',
        animation:'fogDrift 8s ease-in-out infinite',
      }}/>
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to top, rgba(20,50,80,0.35) 0%, rgba(20,50,80,0.05) 50%, transparent 100%)',
        animation:'fogDrift 12s ease-in-out 3s infinite reverse',
      }}/>
    </div>
  )
}

// ─── Zipzipzip UFO ────────────────────────────────────────────────────────────
function ZipzipSprite({zip}:{zip:Zipzip}) {
  const startX = zip.dir==='ltr' ? '-160px' : 'calc(100vw + 160px)'
  const endX   = zip.dir==='ltr' ? 'calc(100vw + 160px)' : '-160px'
  const scaleX = zip.dir==='rtl' ? -1 : 1
  return (
    <div style={{position:'absolute',top:`${zip.y}%`,left:0,width:'100%',height:0,pointerEvents:'none',zIndex:4}}>
      <div style={{
        position:'absolute', left:startX,
        animation:`zipFly-${zip.id} ${zip.dur}s linear ${zip.delay}s infinite`,
        transform:`scaleX(${scaleX})`, display:'flex',flexDirection:'column',alignItems:'center',
      }}>
        <img src="/photos/Zipzipzip.png" alt="ufo"
          style={{width:zip.scale,height:'auto',imageRendering:'pixelated',
            filter:'drop-shadow(0 0 8px rgba(100,220,255,0.9)) drop-shadow(0 0 20px rgba(80,200,255,0.4))',
            animation:`zipGlow-${zip.id} 2s ease-in-out infinite`,
          }}/>
        <div style={{width:Math.round(zip.scale*0.3),height:28,background:'linear-gradient(to bottom,rgba(100,220,255,0.35),transparent)',marginTop:-2}}/>
      </div>
      <style>{`
        @keyframes zipFly-${zip.id}  { 0%{left:${startX}} 100%{left:${endX}} }
        @keyframes zipGlow-${zip.id} {
          0%,100%{filter:drop-shadow(0 0 8px rgba(100,220,255,0.9)) drop-shadow(0 0 20px rgba(80,200,255,0.4));}
          50%    {filter:drop-shadow(0 0 14px rgba(160,240,255,1)) drop-shadow(0 0 30px rgba(100,220,255,0.7));}
        }
      `}</style>
    </div>
  )
}

// ─── Pixel Couple ─────────────────────────────────────────────────────────────
function PixelCouple() {
  const [kevinMsg, setKevinMsg] = useState(false)
  const [gabiMsg, setGabiMsg] = useState(false)

  const clickKevin = () => {
    setKevinMsg(true); setTimeout(() => setKevinMsg(false), 3000)
  }
  const clickGabi = () => {
    setGabiMsg(true); setTimeout(() => setGabiMsg(false), 3000)
  }

  return (
    <div className="people-pulse" style={{
      position:'absolute',bottom:52,left:'50%',transform:'translateX(-50%)',
      display:'flex',alignItems:'flex-end',gap:10,zIndex:7,userSelect:'none',
    }}>
      {/* Kevin (blue) */}
      <div 
        style={{display:'flex',flexDirection:'column',alignItems:'center', cursor:'pointer', position: 'relative'}}
        onClick={clickKevin}
      >
        {kevinMsg && (
          <div style={{
            position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8,
            background: '#fff', border: '2px solid #0f0f23', padding: '4px 8px', borderRadius: 4,
            fontFamily: "'VT323',monospace", fontSize: 13, color: '#0f0f23', whiteSpace: 'nowrap',
            animation: 'fadeInUp 0.2s', zIndex: 10
          }}>
            un zip zip zip :0
            <div style={{position:'absolute', bottom:-5, left:'50%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'4px solid transparent', borderRight:'4px solid transparent', borderTop:'5px solid #0f0f23'}}/>
            <div style={{position:'absolute', bottom:-2, left:'50%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'2px solid transparent', borderRight:'2px solid transparent', borderTop:'3px solid #fff'}}/>
          </div>
        )}
        <div style={{width:10,height:10,background:'#7b9ff9',border:'2px solid #0f0f23',borderRadius:'50%',position:'relative'}}>
          <div style={{position:'absolute',top:2,left:1,width:2,height:2,background:'#0f0f23'}}/>
          <div style={{position:'absolute',top:2,right:1,width:2,height:2,background:'#0f0f23'}}/>
        </div>
        <div style={{width:12,height:18,background:'#2255cc',border:'2px solid #0f0f23',marginTop:1,position:'relative'}}>
          <div style={{position:'absolute',top:2,left:-7,width:7,height:3,background:'#2255cc',border:'1px solid #0f0f23',transform:'rotate(-45deg)',transformOrigin:'right center'}}/>
          <div style={{position:'absolute',top:2,right:-7,width:7,height:3,background:'#2255cc',border:'1px solid #0f0f23',transform:'rotate(45deg)',transformOrigin:'left center'}}/>
        </div>
        <div style={{display:'flex',gap:2}}>
          <div style={{width:5,height:10,background:'#1a1a5a',border:'2px solid #0f0f23'}}/>
          <div style={{width:5,height:10,background:'#1a1a5a',border:'2px solid #0f0f23'}}/>
        </div>
        <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:5,color:'#7b9ff9',marginTop:3,textShadow:'1px 1px 0 #000'}}>Kevin</div>
      </div>
      {/* Gabi (pink) */}
      <div 
        style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:2, cursor:'pointer', position: 'relative'}}
        onClick={clickGabi}
      >
        {gabiMsg && (
          <div style={{
            position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8,
            background: '#fff', border: '2px solid #0f0f23', padding: '4px 8px', borderRadius: 4,
            fontFamily: "'VT323',monospace", fontSize: 13, color: '#0f0f23', whiteSpace: 'nowrap',
            animation: 'fadeInUp 0.2s', zIndex: 10
          }}>
            mira mira
            <div style={{position:'absolute', bottom:-5, left:'50%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'4px solid transparent', borderRight:'4px solid transparent', borderTop:'5px solid #0f0f23'}}/>
            <div style={{position:'absolute', bottom:-2, left:'50%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'2px solid transparent', borderRight:'2px solid transparent', borderTop:'3px solid #fff'}}/>
          </div>
        )}
        <div style={{width:10,height:10,background:'#ff9ec4',border:'2px solid #0f0f23',borderRadius:'50%',position:'relative'}}>
          <div style={{position:'absolute',top:2,left:1,width:2,height:2,background:'#0f0f23'}}/>
          <div style={{position:'absolute',top:2,right:1,width:2,height:2,background:'#0f0f23'}}/>
          <div style={{position:'absolute',top:-4,left:-2,width:14,height:6,background:'#3a1800',border:'1px solid #0f0f23',borderRadius:'4px 4px 0 0'}}/>
        </div>
        <div style={{width:14,height:18,background:'#e05c95',border:'2px solid #0f0f23',marginTop:1,borderRadius:'0 0 3px 3px',position:'relative'}}>
          <div style={{position:'absolute',top:2,left:-7,width:7,height:3,background:'#e05c95',border:'1px solid #0f0f23',transform:'rotate(-45deg)',transformOrigin:'right center'}}/>
          <div style={{position:'absolute',top:2,right:-7,width:7,height:3,background:'#e05c95',border:'1px solid #0f0f23',transform:'rotate(45deg)',transformOrigin:'left center'}}/>
        </div>
        <div style={{display:'flex',gap:2}}>
          <div style={{width:5,height:10,background:'#6a0a3a',border:'2px solid #0f0f23'}}/>
          <div style={{width:5,height:10,background:'#6a0a3a',border:'2px solid #0f0f23'}}/>
        </div>
        <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:5,color:'#ff9ec4',marginTop:3,textShadow:'1px 1px 0 #000'}}>Gabi</div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate(-50%, 5px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DesktopBackground() {
  const [stars, setStars]     = useState<Star[]>([])
  const [fireflies, setFF]    = useState<Firefly[]>([])
  const [zips, setZips]       = useState<Zipzip[]>([])

  useEffect(() => {
    // Stars — seeded so no SSR/CSR mismatch
    setStars(Array.from({length:90},(_,i)=>({
      id:i, x:(i*137.5)%100, y:(i*73.1)%73,
      size: i%10<6?2:i%10<9?3:4,
      dur:`${2+((i*31)%40)/10}s`,
      delay:`${((i*17)%50)/10}s`,
    })))

    setFF(Array.from({length:14},(_,i)=>({
      id:i,
      x: i<7 ? 2+(i*8)  : 82+(i-7)*2.5,  // left & right clusters near trees
      y: 45+(i%5)*8,
      dur: 3+i*0.5, delay: i*0.4, size:i%3===0?3:2,
    })))

    setZips([
      {id:1,y:7,  dur:22,delay:3, dir:'ltr',scale:62},
      {id:2,y:16, dur:30,delay:14,dir:'rtl',scale:50},
      {id:3,y:11, dur:17,delay:26,dir:'ltr',scale:78},
    ])
  },[])

  return (
    <div style={{
      position:'fixed',inset:0,zIndex:0,overflow:'hidden',
      background:'linear-gradient(180deg,#01010f 0%,#040620 40%,#091040 75%,#0d1a50 100%)',
    }}>
      {/* Stars */}
      {stars.map(s=>(
        <div key={s.id} style={{
          position:'absolute',top:`${s.y}%`,left:`${s.x}%`,
          width:s.size,height:s.size,background:'#fffce8',
          animation:`twinkle ${s.dur} ease-in-out ${s.delay} infinite`,
          borderRadius:'50%',
        }}/>
      ))}

      {/* Constellations */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
        <OrionSVG/>
        <LabelSVG stars={GEMINI_STARS} color="#ffb7e0" label="GÉMINIS" lx={0.79} ly={0.10}/>
        <LabelSVG stars={LIBRA_STARS}  color="#b8e88e" label="LIBRA"   lx={0.78} ly={0.46}/>
      </div>

      {/* UFOs */}
      {zips.map(z=><ZipzipSprite key={z.id} zip={z}/>)}

      {/* Moon */}
      <FullMoon/>

      {/* Mountains — more layered depth */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:'32%',overflow:'hidden',zIndex:2}}>
        {/* Far mountains (lighter) */}
        {[{l:'5%',w:'20%',h:'55%',c:'#0d1a38'},{l:'25%',w:'22%',h:'65%',c:'#0a1530'},
          {l:'55%',w:'20%',h:'58%',c:'#0c182e'},{l:'72%',w:'22%',h:'62%',c:'#0a1432'}].map((m,i)=>(
          <div key={'f'+i} style={{position:'absolute',bottom:0,left:m.l,width:m.w,height:m.h,
            background:m.c,clipPath:'polygon(0% 100%, 50% 0%, 100% 100%)',opacity:0.7}}/>
        ))}
        {/* Near mountains */}
        {[{l:'0%',w:'22%',h:'75%',c:'#080f20'},{l:'15%',w:'20%',h:'90%',c:'#0a1528'},
          {l:'30%',w:'22%',h:'82%',c:'#06101c'},{l:'50%',w:'22%',h:'96%',c:'#08142c'},
          {l:'65%',w:'20%',h:'74%',c:'#091528'},{l:'78%',w:'24%',h:'88%',c:'#070f20'}].map((m,i)=>(
          <div key={'n'+i} style={{position:'absolute',bottom:0,left:m.l,width:m.w,height:m.h,
            background:m.c,clipPath:'polygon(0% 100%, 50% 0%, 100% 100%)',
            filter:'drop-shadow(0 0 8px rgba(10,30,80,0.4))'}}/>
        ))}
        {/* Grass strip */}
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:30,
          background:'linear-gradient(180deg,#143a14,#0a240a)',borderTop:'2px solid #1e5a1e'}}/>
        <div style={{position:'absolute',bottom:28,left:0,right:0,height:5,
          background:'repeating-linear-gradient(90deg,#2d7a2d 0,#2d7a2d 8px,#3da83d 8px,#3da83d 10px)',
          opacity:0.7}}/>
      </div>

      {/* Vivid Trees */}
      <div style={{position:'absolute',bottom:26,left:0,right:0,zIndex:4,pointerEvents:'none'}}>
        {TREES.map((t,i)=><VividTree key={i} t={t} idx={i}/>)}
      </div>

      {/* Ground Fog */}
      <GroundFog/>

      {/* Fireflies */}
      <FireflyLayer flies={fireflies}/>

      {/* Couple */}
      <PixelCouple/>

      {/* Cleo */}
      <div className="cat-bob" style={{
        position:'absolute',bottom:52,right:'1.5%',fontSize:26,zIndex:8,
        filter:'drop-shadow(0 0 8px rgba(255,158,196,0.6))',userSelect:'none',
      }} title="Cleo 💙">🐈</div>

      {/* Global animations for this component */}
      <style>{`
        @keyframes treeSway {
          0%,100% { transform: rotate(0deg); }
          25%      { transform: rotate(0.8deg); }
          75%      { transform: rotate(-0.8deg); }
        }
        @keyframes fireflyFloat {
          0%,100% { transform: translate(0,0); }
          25%      { transform: translate(8px,-10px); }
          50%      { transform: translate(-6px,-18px); }
          75%      { transform: translate(10px,-8px); }
        }
        @keyframes fireflyGlow {
          0%,100% { opacity:0.3; box-shadow:0 0 4px 2px rgba(120,255,120,0.4); }
          50%      { opacity:1;   box-shadow:0 0 10px 4px rgba(120,255,120,0.9); }
        }
        @keyframes fogDrift {
          0%,100% { transform: scaleX(1) translateX(0);   opacity:1; }
          50%      { transform: scaleX(1.08) translateX(2%); opacity:0.6; }
        }
        @keyframes moonPulse {
          0%,100% { opacity:0.8; transform:scale(1); }
          50%      { opacity:1;   transform:scale(1.04); }
        }
      `}</style>
    </div>
  )
}
