const ball = document.querySelector(".ball")
const bat = document.querySelector(".bat")
const container = document.querySelector(".container")
const score_label = document.querySelector(".score")
const high_score_label = document.querySelector(".high-score")
const left_btn = document.querySelector(".left_btn")
const right_btn = document.querySelector(".right_btn")
const modal = document.querySelector(".modal-container")
const start_btn = document.querySelector(".start")
const prev_score = document.querySelector(".prev-score h1")

const vx_start = 2
const vy_start = 2
const container_width = 300
const container_height = 350


let vx = vx_start
let vy = vy_start
let interval = 20
let ball_size = 20
let x_ball = Math.random()*(container_width-ball_size-1)
let y_ball = ball_size + Math.random()*(container_height-ball_size)
let bat_move = 5
let bat_width = 30
let bat_height = 5
let x_bat = container_width/2-bat_width
let y_bat = 0
let score = 0
// let high = Number(localStorage.getItem('hs'))
let ball_speed_inc_per = 0.05
let bat_speed_inc = 0.02
let bat_dir = 0
let high_db = 0
let high_score_changed = true




container.style.width = convert_to(container_width, 'px')
container.style.height = convert_to(container_height, 'px')
ball.style.left = convert_to(x_bat, 'px')
ball.style.top = convert_to(y_bat, 'px')
ball.style.width = convert_to(ball_size, 'px')
ball.style.height = convert_to(ball_size, 'px')
bat.style.width = convert_to(bat_width, 'px')
bat.style.height = convert_to(bat_height, 'px')

function convert_to(variable , unit) {
    return String(variable)+unit
}


function set_high(){
    // if (high_db > high) {
    //     high = high_db
    //     high_score_changed = true
    // }
    if (high_db < score) {
        high_db = score
        console.log(high_db)
        high_score_changed = true
    }


    if (high_score_changed) {
        // localStorage.setItem('hs', high_db)
        high_score_label.textContent = high_db
        // high_db = high
        db.collection('high-score').doc(high_id).update({"score": high_db})
        high_score_changed = false
    }

}




function start(){
    timerId = setInterval(move, interval)
    set_high()
}

function move_left() {
       if ( (x_bat-bat_move < 0)){
           x_bat = 0
    } else {
        
        x_bat -= bat_move        
        }
    bat.style.left = convert_to(x_bat, 'px')
        
}

function move_right() {
if ( (x_bat+bat_move >= container_width-bat_width)){
    x_bat = container_width-bat_width
}
else {
    
    x_bat += bat_move
        }
    bat.style.left = convert_to(x_bat, 'px')
}

function move() {
    if (x_ball+ball_size > container_width){
        vx = -vx
    }

    if (y_ball+ball_size > container_height-bat_height) {
        vy = -vy
    }

    if (x_ball < 0){
        vx = -vx
    }

    if (y_ball <= 0 ) {
    
        console.log(x_ball, x_bat, x_bat + bat_width)
        // hit
        if ((x_ball >= x_bat && x_ball <= x_bat + bat_width)||(x_ball+ball_size >= x_bat && x_ball+ball_size <= x_bat + bat_width)) {
            score += 100
            set_high()
            vy += ball_speed_inc_per*vy
            vx += ball_speed_inc_per*vx
            vy = -vy
            bat_move += bat_speed_inc*bat_move
            bat_speed_inc += 0.05*bat_speed_inc
            ball_speed_inc_per -= 0.01*ball_speed_inc_per

        } else {
            // miss
            prev_score.textContent = score
            reset()
            modal.style.display = 'grid'
            container.style.display = "none"
        }
        score_label.innerHTML = score
    }

    x_ball += vx
    y_ball += vy
    ball.style.left = convert_to(x_ball, 'px')
    ball.style.top = convert_to(y_ball, 'px')

    if (bat_dir == 1){
        move_right()
    }
    else if (bat_dir == -1){
        move_left()
    }
}

function reset() {
    clearInterval(timerId)
    score = 0
    x_ball = ball_size + Math.random()*container_width-ball_size
    y_ball = 100
    vy = vy_start
    vx = vx_start

    bat_move = 5
    bat_speed_inc = 0.01
    ball_speed_inc_per = 0.05
    x_bat = container_width/2-bat_width
    bat.style.left = convert_to(x_bat, 'px')
}

document.addEventListener('keydown', (e)=>{
    if (e.key == 'ArrowLeft'){
       move_left()
    }
    else if (e.key == 'ArrowRight') {
        move_right()
}
})

// left_btn.addEventListener("click", ()=>{
//     move_left()
// })

// right_btn.addEventListener("click", ()=>{
//    move_right()
// })
let count = 0
const touch_duration = interval

start_btn.addEventListener("click", ()=>{
        modal.style.display = "none"
        container.style.display = "block"
start()

})

left_btn.addEventListener("touchstart", (e)=>{
    bat_dir = -1
})

left_btn.addEventListener("touchend", (e)=>{
    count = 0

    bat_dir = 0
})

right_btn.addEventListener("touchstart", (e)=>{
    bat_dir = 1
})

right_btn.addEventListener("touchend", (e)=>{
    count = 0
    bat_dir = 0
})

