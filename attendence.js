const students = [
    { roll: 1, name: "Amit", present: 0, total: 0 },
    { roll: 2, name: "Neha", present: 0, total: 0 },
    { roll: 3, name: "Rahul", present: 0, total: 0 },
    { roll: 4, name: "Priya", present: 0, total: 0 }
];

const tableBody = document.querySelector("#attendanceTable tbody");

// Load data from localStorage
function loadData() {
    const data = JSON.parse(localStorage.getItem("attendance"));
    if (data) {
        data.forEach((student, index) => students[index] = student);
    }
}
loadData();

function saveData() {
    localStorage.setItem("attendance", JSON.stringify(students));
}

// Display table
function renderTable() {
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        const percentage = student.total === 0 ? 0 :
            ((student.present / student.total) * 100).toFixed(2);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.roll}</td>
            <td>${student.name}</td>
            <td>
                <button onclick="markPresent(${index})">Present</button>
            </td>
            <td>
                <button onclick="markAbsent(${index})">Absent</button>
            </td>
            <td>${student.total}</td>
            <td>${percentage}%</td>
        `;

        tableBody.appendChild(row);
    });
}

function markPresent(index) {
    students[index].present++;
    students[index].total++;
    saveData();
    renderTable();
}

function markAbsent(index) {
    students[index].total++;
    saveData();
    renderTable();
}

function generateReport() {
    let reportText = "Monthly Attendance Report<br><br>";

    students.forEach(student => {
        const percent = student.total === 0 ? 0 :
            ((student.present / student.total) * 100).toFixed(2);

        reportText += `${student.name}: ${percent}%<br>`;
    });

    document.getElementById("report").innerHTML = reportText;
}

// Initial render
renderTable();
