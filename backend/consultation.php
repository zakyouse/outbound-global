<?php
// consultation.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/index.php"; // exposes $pdo

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "POST") {
    $raw = file_get_contents("php://input");
$data = json_decode($raw, true);

// merge JSON into $_POST for convenience
if (is_array($data)) {
    $_POST = array_merge($_POST, $data);
}
    $action = $_POST['action'] ?? null;

    switch ($action) {
        case "toggle_viewed":
            toggleViewed($pdo);
            break;

        case "delete":
            deleteConsultation($pdo);
            break;

        default:
            storeConsultation($pdo);
    }
} elseif ($method === "GET") {
    fetchConsultations($pdo);
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
    exit;
}

/**
 * STORE CONSULTATION
 */
function storeConsultation($pdo)
{
    if (
        empty($_POST['full_name']) ||
        empty($_POST['email']) ||
        empty($_POST['phone']) ||
        empty($_POST['country']) ||
        empty($_POST['preferred_date']) ||
        empty($_POST['preferred_time']) ||
        empty($_POST['service_type'])
    ) {
        http_response_code(400);
        echo json_encode(["message" => "Missing required fields"]);
        return;
    }

    // Handle CV upload
    $cvPath = null;
    if (!empty($_FILES['cv']['name'])) {
        $uploadDir = __DIR__ . "/uploads/cv/";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fileName = time() . "_" . basename($_FILES['cv']['name']);
        $targetPath = $uploadDir . $fileName;

        if (!move_uploaded_file($_FILES['cv']['tmp_name'], $targetPath)) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to upload CV"]);
            return;
        }

        $cvPath = "uploads/cv/" . $fileName;
    }

    $stmt = $pdo->prepare("
        INSERT INTO consultations
        (full_name, email, phone, country, preferred_date, preferred_time, service_type, cv_path, is_viewed)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)
    ");

    $stmt->execute([
        $_POST['full_name'],
        $_POST['email'],
        $_POST['phone'],
        $_POST['country'],
        $_POST['preferred_date'],
        $_POST['preferred_time'],
        $_POST['service_type'],
        $cvPath
    ]);

    echo json_encode(["message" => "Consultation booked successfully"]);
}

/**
 * FETCH CONSULTATIONS
 */
function fetchConsultations($pdo)
{
    $stmt = $pdo->query("
        SELECT id, full_name, email, phone, country,
               preferred_date, preferred_time, service_type,
               cv_path, created_at, is_viewed
        FROM consultations
        ORDER BY created_at DESC
    ");

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

/**
 * TOGGLE is_viewed
 */
function toggleViewed($pdo)
{
    if (empty($_POST['id'])) {
        http_response_code(400);
        echo json_encode(["message" => "Consultation ID required"]);
        return;
    }

    $stmt = $pdo->prepare("
        UPDATE consultations
        SET is_viewed = NOT is_viewed
        WHERE id = ?
    ");

    $stmt->execute([$_POST['id']]);

    echo json_encode(["message" => "View status updated"]);
}

/**
 * DELETE CONSULTATION
 */
function deleteConsultation($pdo)
{
    if (empty($_POST['id'])) {
        http_response_code(400);
        echo json_encode(["message" => "Consultation ID required"]);
        return;
    }

    $stmt = $pdo->prepare("DELETE FROM consultations WHERE id = ?");
    $stmt->execute([$_POST['id']]);

    echo json_encode(["message" => "Consultation deleted"]);
}
